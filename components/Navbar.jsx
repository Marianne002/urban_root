// components/Navbar.jsx
"use client";
import "@styles/Navbar.scss";
import { Person } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  // Get session and user from useSession hook
  const { data: session, status } = useSession();
  const user = session?.user;

  // State to manage dropdown menu
  const [userId, setUserId] = useState(null);

  // Get the router object
  const router = useRouter();

  // Effect to set userId from session when session updates
  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session]);

  // Function to handle logout
  const handleLogout = async () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-md navbar-dark fixed-top"
        aria-label="Offcanvas navbar medium"
      >
        <div className="container-fluid">
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
          <div className="d-flex flex-row justify-content-center aligns-items-center">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <button
              className="navbar-img-user d-xs-block d-sm-block d-md-none d-lg-none mx-3"
              id="user"
              aria-label="User profile image"
            >
              {!user ? (
                <Person sx={{ color: "gray" }} />
              ) : (
                <img
                  src={user.profileImagePath}
                  alt="profile"
                  style={{ objectFit: "cover", borderRadius: "50%" }}
                />
              )}
            </button>
          </div>
          <div
            className="offcanvas offcanvas-end dark-green-bg w-100"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <a className="navbar-brand" href="/">
                <img
                  className="d-xs-block d-sm-block d-md-none d-lg-none"
                  src="/assets/logo-urban-root-xs-border.webp"
                  alt="Petit logo Urban Root"
                />
                <img
                  className="d-none d-xs-none d-sm-none d-md-block d-lg-block"
                  src="/assets/logo-urban-root-sm-border.webp"
                  alt="Logo Urban Root"
                />
              </a>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
              <button
                className="navbar-img-user d-xs-block d-sm-block d-md-none d-lg-none mx-3"
                id="profile"
                aria-label="User profile image"
              >
                {!user ? (
                  <Person sx={{ color: "gray" }} />
                ) : (
                  <img
                    src={user.profileImagePath}
                    alt="profile"
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                  />
                )}
              </button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link" href="/carte">
                    Carte
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/forum">
                    Forum
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/guides">
                    Guides
                  </a>
                </li>
                {!user ? (
                  <>
                    <li className="nav-item">
                      <a className="nav-link" href="/login">
                        Se connecter
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/register">
                        S'inscrire
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={handleLogout}>
                      Déconnexion
                    </a>
                  </li>
                )}
              </ul>

              <button className="navbar-img-user d-none d-xs-none d-sm-none d-md-block d-lg-block" id="profile-image" aria-label="User profile image">
                {!user ? (
                  <Person sx={{ color: "gray" }} />
                ) : (
                  <img
                    src={user.profileImagePath}
                    alt="profile"
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
