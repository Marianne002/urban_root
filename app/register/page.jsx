// app/register/page.jsx
"use client";
import "@styles/Login.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    profileImage: null,
    description: "",
  });

  const [errors, setErrors] = useState({
    general: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    profileImage: "",
    description: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateStep = () => {
    let isValid = true;
    let newErrors = { ...errors, general: "" };

    // Reset specific errors for the current step
    const stepErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      profileImage: "",
      description: "",
    };

    switch (step) {
      case 1:
        if (
          !formData.email &&
          !formData.password &&
          !formData.confirmPassword
        ) {
          newErrors.general = "Merci de remplir tous les champs.";
          isValid = false;
        } else {
          if (!formData.email) stepErrors.email = "L'email est requis.";
          if (!formData.password)
            stepErrors.password = "Le mot de passe est requis.";
          if (!formData.confirmPassword)
            stepErrors.confirmPassword =
              "La confirmation du mot de passe est requise.";
          if (
            formData.password &&
            formData.confirmPassword &&
            formData.password !== formData.confirmPassword
          ) {
            stepErrors.confirmPassword =
              "Les mots de passe ne correspondent pas.";
          }
          if (Object.values(stepErrors).some((error) => error)) {
            isValid = false;
          }
        }
        break;
      case 2:
        if (
          !formData.profileImage &&
          !formData.username &&
          !formData.description
        ) {
          newErrors.general = "Merci de remplir tous les champs.";
          isValid = false;
        } else {
          if (!formData.profileImage)
            stepErrors.profileImage = "L'image de profil est requise.";
          if (!formData.username)
            stepErrors.username = "Le nom d'utilisateur est requis.";
          if (!formData.description)
            stepErrors.description = "La description est requise.";
          if (Object.values(stepErrors).some((error) => error)) {
            isValid = false;
          }
        }
        break;
      default:
        isValid = false;
    }

    setErrors({ ...newErrors, ...stepErrors });
    return isValid;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await fetch("/api/register", {
        method: "POST",
        body: formDataToSend,
      });
      const result = await response.json();
      if (response.ok) {
        // Connexion automatique après inscription
        const signInResponse = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });
        if (signInResponse.ok) {
          router.push("/");
        } else {
          setErrors({
            ...errors,
            general: "Erreur lors de la connexion après l'inscription.",
          });
        }
      } else {
        setErrors({
          ...errors,
          general: result.message || "Erreur lors de l'inscription.",
        });
      }
    }
  };

  return (
    <>
      <title>Inscription - Urban Root</title>
      <meta
        name="description"
        content="Rejoignez Urban Root et créez votre compte dès maintenant."
      />
      <meta
        name="keywords"
        content="inscription, compte, rejoindre Urban Root, créer un compte Urban Root"
      />

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
          <form className="login_content_form" onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <h1 className="light-green-text">Créez votre compte</h1>
                <div>
                  <label htmlFor="email">Adresse mail</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>
                <div>
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>
                <div>
                  <label htmlFor="confirmPassword">Confirmation du mot de passe</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <span className="error">{errors.confirmPassword}</span>
                  )}
                </div>
                {errors.general && (
                  <span className="error">{errors.general}</span>
                )}
                <button className="btn" type="button" onClick={handleNextStep}>
                  Suivant
                </button>
                <div className="d-flex flex-column">
                  <div className="login_content_continue">
                    <div></div>
                    <p className="p-0 px-3 m-0">Ou continuez avec</p>
                    <div></div>
                  </div>
                  <div className="login_content_social gap-3">
                    <button 
                        className="rs" 
                        onClick={(e) => {
                          e.preventDefault();
                          signIn("google");
                        }}
                        aria-label="Connexion avec Google"
                      >
                      <img src="/assets/icon-google.svg" alt="Icon Google" />
                    </button>
                  </div>
                </div>
                <a href="/login">Vous avez déjà un compte ? Se connecter</a>
              </>
            )}
            {step === 2 && (
              <>
                <h1 className="gradient-color">Informations</h1>
                <div>
                  <label>Image de profil</label>
                  <input
                    type="file"
                    name="profileImage"
                    onChange={handleChange}
                  />
                  {errors.profileImage && (
                    <span className="error">{errors.profileImage}</span>
                  )}
                </div>
                <div>
                  <label>Nom d'utilisateur</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && (
                    <span className="error">{errors.username}</span>
                  )}
                </div>
                <div>
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                  {errors.description && (
                    <span className="error">{errors.description}</span>
                  )}
                </div>
                {errors.general && (
                  <span className="general-error">{errors.general}</span>
                )}
                <button className="btn" type="submit">
                  Créer un compte
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
