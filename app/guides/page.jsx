// app/guides/page.jsx
"use client";

import { useEffect, useState } from "react";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Loader from "@components/Loader";

const guidesData = [
  {
    id: 1,
    title: "Jardinez urbain !",
    imageUrl: "/assets/guides/jardinez-urbain.webp",
    link: "https://www.fnac.com/a10458532/BOHNE-BURKHARD-Jardinez-urbain"
  },
  {
    id: 2,
    title: "Urban Jungle - Décorer avec les plantes",
    imageUrl: "/assets/guides/urban-jungle-decorer-avec-les-plantes.webp",
    link: "https://www.fnac.com/a10627033/Igor-Josifovic-Urban-Jungle-Decorer-avec-les-plantes"
  },
  {
    id: 3,
    title: "Le guide de la permaculture urbaine",
    imageUrl: "/assets/guides/le-guide-de-la-permaculture-urbaine.webp",
    link: "https://www.fnac.com/a10297388/Carine-Mayo-Le-guide-de-la-permaculture-urbaine"
  },
  {
    id: 4,
    title: "Le potager urbain",
    imageUrl: "/assets/guides/le-potager-urbain.webp",
    link: "https://www.fnac.com/a10132623/Bertrand-Dumont-Le-potager-urbain"
  },
  {
    id: 5,
    title: "Urbanisme et biodiversité",
    imageUrl: "/assets/guides/urbanisme-et-biodiversite.webp",
    link: "https://www.fnac.com/a14041685/Philippe-Clergeau-Urbanisme-et-biodiversite"
  },
  {
    id: 6,
    title: "Manifeste pratique de la végétalisation urbaine - 50 actions Coups de green pour changer la vie sans",
    imageUrl: "/assets/guides/manifeste-pratique-de-la-vegetalisation-urbaine.webp",
    link: "https://www.fnac.com/a14810010/Ophelie-Damble-Manifeste-pratique-de-la-vegetalisation-urbaine-50-actions-Coups-de-green-pour-changer-la-vie-sans"
  },
  {
    id: 7,
    title: "Mon jardin urbain",
    imageUrl: "/assets/guides/mon-jardin-urbain.webp",
    link: "https://www.fnac.com/a15592653/Nina-Castel-Mon-jardin-urbain"
  },
  {
    id: 8,
    title: "Manuel d’écologie urbaine",
    imageUrl: "/assets/guides/manuel-d-ecologie-urbaine.webp",
    link: "https://www.fnac.com/a13735849/Audrey-Muratet-Manuel-d-ecologie-urbaine"
  },
  {
    id: 9,
    title: "Potager bio urbain",
    imageUrl: "/assets/guides/potager-bio-urbain.webp",
    link: "https://www.fnac.com/livre-numerique/a10638255/Cristina-Rebiere-Potager-bio-urbain#FORMAT=ebook%20(ePub)"
  },
  {
    id: 10,
    title: "Un potager urbain : des légumes pour tous et partout !",
    imageUrl: "/assets/guides/un-potager-urbain-des-legumes-pour-tous-et-partout.webp",
    link: "https://www.fnac.com/a11239360/Alain-Delavie-Un-potager-urbain-des-legumes-pour-tous-et-partout"
  },
  {
    id: 11,
    title: "Le guide Marabout du jardinier urbain",
    imageUrl: "/assets/guides/le-guide-marabout-du-jardinier-urbain.webp",
    link: "https://www.fnac.com/a14019347/Thibaut-Schepman-Le-guide-Marabout-du-jardinier-urbain"
  },
  {
    id: 12,
    title: "Un potager sur mon balcon",
    imageUrl: "/assets/guides/un-potager-sur-mon-balcon.webp",
    link: "https://www.fnac.com/a9306157/Odile-Koenig-Un-potager-sur-mon-balcon"
  },
  {
    id: 13,
    title: "Peas and Love",
    imageUrl: "/assets/guides/peas-love.webp",
    link: "https://www.fnac.com/a11579892/Catherine-Kluger-Peas-and-Love"
  },
  {
    id: 14,
    title: "Un potager sans jardin pour tous les urbains",
    imageUrl: "/assets/guides/un-potager-sans-jardin-pour-tous-les-urbains.webp",
    link: "https://www.fnac.com/a14719090/Agnes-Guillaumin-Un-potager-sans-jardin-pour-tous-les-urbains"
  },
];

const Guides = () => {
  const [guides, setGuides] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGuides, setFilteredGuides] = useState([]);

  useEffect(() => {
    setGuides(guidesData);
    setFilteredGuides(guidesData);
  }, []);

  useEffect(() => {
    // Filtrer les guides en fonction de la recherche
    if (searchQuery) {
      const results = guides.filter((guide) =>
        guide.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredGuides(results);
    } else {
      setFilteredGuides(guides);
    }
  }, [searchQuery, guides]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (!guides.length) {
    return <Loader />;
  }

  return (
    <>
      <title>Guides Éducatifs - Urban Root</title>
      <meta name="description" content="Guides éducatifs sur le jardinage urbain et la durabilité." />
      <meta name="keywords" content="jardinage urbain, durabilité, guides éducatifs" />

      <Navbar />
      <div className="navbar-padding-protection"></div>

      <section className="container">
        <h1>Guides Éducatifs</h1>
        <p className="text-white mb-4">
          Explorez notre collection de guides soigneusement sélectionnés pour vous aider à maîtriser l'art du jardinage urbain et à adopter des pratiques durables. Que vous soyez un novice ou un jardinier expérimenté, ces ressources vous fourniront des conseils précieux et des inspirations pour transformer votre espace urbain en un havre de verdure.
        </p>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Rechercher un guide..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="form-control"
          />
        </div>

        <div className="row">
          {filteredGuides.length > 0 ? (
            filteredGuides.map((guide) => (
              <div className="col-6 col-xs-6 col-sm-6 col-md-6 col-lg-3 mb-4 d-flex justify-content-center" key={guide.id}>
                <div className="card bg-dark rounded" style={{ width: "180px" }}>
                  <img
                    src={guide.imageUrl}
                    alt={guide.title}
                    className="card-img-top rounded m-auto"
                    style={{ minHeight: "200px", maxHeight: "200px", margin: "auto" }}
                  />
                  <div className="card-body">
                    <a
                      href={guide.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success w-100"
                    >
                      En savoir +
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">Aucun guide ne correspond à votre recherche.</p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Guides;
