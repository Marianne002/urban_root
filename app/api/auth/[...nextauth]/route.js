// app/api/auth/[...nextauth].js
import { connectToDB } from "@mongodb/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/User";
import { compare } from "bcryptjs";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                await connectToDB();
                const user = await User.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error("Invalid email or password");
                }
                const isMatch = await compare(credentials.password, user.password);
                if (!isMatch) {
                    throw new Error("Invalid email or password");
                }
                return user;
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }) {
            await connectToDB();
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();
            session.user.username = sessionUser.username;
            session.user.profileImagePath = sessionUser.profileImagePath;
            return session;
        },
        async jwt({ token, account, profile, user }) {
            if (account) {
                if (account.provider === "google" && profile) {
                    token.userId = (await User.findOne({ email: profile.email }))._id.toString();
                }
                if (account.provider === "credentials" && user) {
                    token.userId = user._id.toString();
                }
            }
            return token;
        },
        async signIn({ account, profile }) {
            if (account.provider === "google") {
                try {
                    await connectToDB();
                    let user = await User.findOne({ email: profile.email });
                    if (!user) {
                        // Generate a unique username
                        let username = profile.name;
                        let userExists = await User.findOne({ username });
        
                        let suffix = 1;
                        while (userExists) {
                            username = `${profile.name}${suffix}`;
                            userExists = await User.findOne({ username });
                            suffix++;
                        }
        
                        // Create a new user
                        user = await User.create({
                            email: profile.email,
                            username: username,
                            profileImagePath: profile.picture,
                            googleId: profile.sub,
                        });
                    }
                    return true;
                } catch (err) {
                    console.log("Error checking if user exists: ", err.message);
                    return false;
                }
            }
            return true;
        },        
        async redirect({ url, baseUrl }) {
            if (url === '/api/auth/signin/google') {
                return '/';
            }
            return baseUrl;
        }
    }
});

export { handler as GET, handler as POST };
