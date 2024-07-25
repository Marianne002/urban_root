// app/page.jsx
"use client";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

const Home = () => (
  <>
    <title>Urban Root</title>
    <meta
      name="description"
      content="Urban Root est une entreprise spécialisée dans la cartographie de jardins urbains et offre des ressources pour le jardinage urbain, y compris une carte interactive, un forum de discussion et des guides pratiques."
    />
    <meta
      name="keywords"
      content="jardin urbain, carte interactive, forum jardinage, guides de jardinage"
    />

    <Navbar />
    <div className="navbar-padding-protection"></div>

    {/* Hero Section */}
    <div className="relative h-[400px] bg-cover bg-center" style={{ backgroundImage: 'url(/assets/jardin-urbain.webp)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative d-flex align-items-center justify-content-center text-white" style={{ background: "#0000003b", height: "400px", filter: "drop-shadow(black 2px 4px 6px)" }}>
        <div className="container p-4">
          <h1 className="mb-4">Bienvenue sur Urban Root</h1>
          <p className="mb-6">
            Intégrez la communauté UrbanRoot et engagez-vous dans une aventure de jardinage urbain collaboratif et respectueux de l’environnement.
          </p>
          <a href="/register" className="btn btn-success">
            Rejoindre la communauté
          </a>
        </div>
      </div>
    </div>

    {/* Map Section */}
    <section className="container d-flex flex-column gap-4">
      <div className="card bg-dark text-white">
        <div className="card-body">
          <div className="d-flex flex-row align-items-center gap-4 mb-2">
            <img src="/assets/icon-map.svg" alt="Icon carte" />
            <h2 className="m-0">Carte</h2>
          </div>
          <p className="mb-4">
            Découvrez les jardins urbains autour de vous grâce à notre carte interactive.
            <br />Explorez les différents espaces verts, filtrez par type d'activité ou de projet, et contribuez à la communauté en ajoutant vos propres jardins.
          </p>
          <a href="/carte" className="btn btn-success">
            Voir la carte
          </a>
        </div>
      </div>

      {/* Forum Section */}
      <div className="card bg-dark text-white">
        <div className="card-body">
          <div className="d-flex flex-row align-items-center gap-4 mb-2">
            <img src="/assets/icon-forum.svg" alt="Icon forum" />
            <h2 className="m-0">Forum</h2>
          </div>
          <p className="mb-4">
            Participez à des discussions passionnantes sur le jardinage urbain, échangez des conseils, posez des questions et trouvez des réponses auprès de notre communauté active. <br />Créez de nouveaux sujets ou contribuez aux discussions existantes.
          </p>
          <a href="/forum" className="btn btn-success">
            Rejoindre le forum
          </a>
        </div>
      </div>

      {/* Guides Section */}
      <div className="card bg-dark text-white">
        <div className="card-body">
          <div className="d-flex flex-row align-items-center gap-4 mb-2">
            <img src="/assets/icon-guide.svg" alt="Icon guide" />
            <h2 className="m-0">Guides</h2>
          </div>
          <p className="mb-4">
            Explorez notre collection de guides éducatifs pour maîtriser le jardinage urbain. <br />Nos guides offrent des conseils pratiques, des inspirations et des techniques pour transformer vos espaces verts en véritables oasis.
          </p>
          <a href="/guides" className="btn btn-success">
            Accéder aux guides
          </a>
        </div>
      </div>
    </section>
    <Footer />
  </>
);

export default Home;
