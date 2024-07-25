// app/not-found.jsx
import "@styles/NotFound.scss";

const NotFound = () => {
  return (
    <>
      <title>Page non trouvée - Urban Root</title>
      <meta name="description" content="La page que vous cherchez n'existe pas ou a été déplacée." />
      <div className="not-found">
        <h1>Page non trouvée</h1>
        <p>La page que vous cherchez n'existe pas ou a été déplacée.</p>
        <a className="btn btn-success mt-3" href="/">Retour à l'accueil</a>
      </div>
    </>
  );
};

export default NotFound;

