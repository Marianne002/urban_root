// components/Footer.jsx
"use client";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-5 mb-3">
          <a className="navbar-brand" id="footer-heading" href="/">
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
        </div>
        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3 mb-3">
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a
                href="/carte"
                className="nav-link p-0"
                aria-label="Lien vers la carte"
              >
                Carte
              </a>
            </li>
            <li className="nav-item mb-2">
              <a
                href="/forum"
                className="nav-link p-0"
                aria-label="Lien vers le forum"
              >
                Forum
              </a>
            </li>
            <li className="nav-item mb-2">
              <a
                href="/guides"
                className="nav-link p-0"
                aria-label="Lien vers les guides"
              >
                Guides
              </a>
            </li>
          </ul>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3 mb-3">
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a
                href="/conditions-generales-utilisation"
                className="nav-link p-0"
                target="_blank"
                aria-label="Lien vers les conditions générales d'utilisation"
              >
                Conditions générales d'utilisation
              </a>
            </li>
            <li className="nav-item mb-2">
              <a
                href="/mentions-legales"
                className="nav-link p-0"
                target="_blank"
                aria-label="Lien vers les mentions légales"
              >
                Mentions légales
              </a>
            </li>
            <li className="nav-item mb-2">
              <a
                href="/politique-de-confidentialite"
                className="nav-link p-0"
                target="_blank"
                aria-label="Lien vers la politique confidentialité"
              >
                Politique de confidentialité
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="d-flex flex-column flex-sm-row justify-content-center text-center text-white py-4 border-top">
        <p>© 2024 Urban Root -  Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
