// app/api/register/route.js
import { connectToDB } from "@mongodb/database";
import User from "@models/User";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import cloudinary from "cloudinary";
import { Readable } from "stream";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    await connectToDB();
    const data = await req.formData();

    // Log the entire form data
    console.log('Form Data:', Object.fromEntries(data.entries()));

    const {
      username,
      email,
      password,
      profileImage,
      description,
    } = Object.fromEntries(data.entries());

    // Log each field individually
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Profile Image:', profileImage);
    console.log('Description:', description);

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password !== data.get('confirmPassword')) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);
    let profileImagePath = "";

    if (profileImage) {
      const buffer = Buffer.from(await profileImage.arrayBuffer());
      const stream = Readable.from(buffer);
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: "user_profiles" },
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          }
        );
        stream.pipe(uploadStream);
      });
      profileImagePath = uploadResult.secure_url;
    }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profileImagePath,
      description: description || "",
      post: [],
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error registering user: ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
