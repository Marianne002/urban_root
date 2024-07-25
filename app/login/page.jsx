// app/login/page.jsx
"use client";
import "@styles/Login.scss";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
    // Initialize the state variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Get the router object
    const router = useRouter();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Sign in with email and password
            const response = await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
            });
            console.log("Response from signIn:", response);

            // If response is ok, redirect to home page
            if (response.ok) {
                router.push("/");
            } else {
                setError("Email ou mot de passe invalides. Essayez de nouveau !");
            }
        } catch (error) {
            console.log("Error logging in: ", error);
        }
    };

    return (
        <>
            <title>Connexion - Urban Root</title>
            <meta name="description" content="Connectez vous à votre compte Urban Root." />
            <meta name="keywords" content="connexion, compte, se connecter à Urban Root" />

            <div className="login">
                <div className="login_content">
                    <a className="navbar-brand" href="/">
                        <img
                            className="d-xs-block d-sm-block d-md-block d-lg-none"
                            src="/assets/logo-urban-root-xs-border.webp"
                            alt="Petit logo Urban Root"
                            height={50}
                        />
                        <img
                            className="d-none d-xs-none d-sm-none d-md-none d-lg-block"
                            src="/assets/logo-urban-root-sm-border.webp"
                            alt="Logo Urban Root"
                            height={80}
                        />
                    </a>
                    <h1 className="light-green-text">Connectez vous</h1>
                    <form className="login_content_form" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">Adresse mail</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {error && <p className="error">{error}</p>}
                        </div>
                        <button className="btn" type="submit">
                            Se connecter
                        </button>
                    </form>
                    <div className="d-flex flex-column">
                        <div className="login_content_continue">
                            <div></div>
                            <p className="p-0 px-3 m-0">Ou continuez avec</p>
                            <div></div>
                        </div>
                        <div className="login_content_social gap-3">
                            <button className="rs" onClick={() => signIn('google')}>
                                <img src="/assets/icon-google.svg" alt="Icon Google" />
                            </button>
                        </div>
                    </div>
                    <a href="/register">Vous n'avez pas de compte ? S'incrire</a>
                </div>
            </div>
        </>
    );
};

export default Login;
