// components/MapPanel.jsx
import "@styles/MapPanel.scss";
import { useState, useEffect } from "react";

const getProjectTypeLabel = (type) => {
  switch (type) {
    case "jardin-potager":
      return "JARDIN / POTAGER";
    case "ferme-urbaine-participative":
      return "FERME URBAINE PARTICIPATIVE";
    case "ferme-urbaine-specialisee":
      return "FERME URBAINE SPÉCIALISÉE";
    default:
      return type;
  }
};

const getProjectTypeIcon = (type) => {
  return `/assets/icon-${type}.svg`;
};

const activityTypes = [
  "animation",
  "compostage",
  "conseil",
  "formation",
  "insertion",
  "production",
  "transformation",
  "vente-sur-place",
];

const productionTechniques = [
  "aeroponie",
  "aquaponie",
  "autre",
  "bacs-ou-pots",
  "biologique",
  "couche-de-terre",
  "hors-sol",
  "hydroponie",
  "indoors",
  "permaculture",
  "pleine-terre",
];

const productionTypes = [
  "algues",
  "champignons",
  "compost",
  "escargots",
  "fleurs",
  "fruits",
  "herbes-aromatiques",
  "houblons-et-vignes",
  "huiles-et-distillats",
  "insectes",
  "jardin-potager",
  "legumes",
  "maraichage-arboriculture",
  "micro-pousses",
  "miel",
  "oeufs",
  "plants",
  "poisson",
  "produits-transformes",
  "viande",
];

const MapPanel = ({ applyFilters, gardens, filters }) => {
  const [activeTab, setActiveTab] = useState("filters");
  const [filteredGardens, setFilteredGardens] = useState([]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    let newFilters;

    if (checked) {
      // Add the type to the list
      if (name.startsWith("typeprojet_")) {
        newFilters = {
          ...filters,
          list_typeprojet: [
            ...filters.list_typeprojet,
            name.replace("typeprojet_", ""),
          ],
        };
      } else if (name.startsWith("typeactivite_")) {
        newFilters = {
          ...filters,
          list_typeactivite: [
            ...filters.list_typeactivite,
            name.replace("typeactivite_", ""),
          ],
        };
      } else if (name.startsWith("techniqueProduction_")) {
        newFilters = {
          ...filters,
          list_techniqueprod: [
            ...filters.list_techniqueprod,
            name.replace("techniqueProduction_", ""),
          ],
        };
      } else if (name.startsWith("typeProduction_")) {
        newFilters = {
          ...filters,
          list_typeprod: [
            ...filters.list_typeprod,
            name.replace("typeProduction_", ""),
          ],
        };
      }
    } else {
      // Remove the type from the list
      if (name.startsWith("typeprojet_")) {
        newFilters = {
          ...filters,
          list_typeprojet: filters.list_typeprojet.filter(
            (type) => type !== name.replace("typeprojet_", "")
          ),
        };
      } else if (name.startsWith("typeactivite_")) {
        newFilters = {
          ...filters,
          list_typeactivite: filters.list_typeactivite.filter(
            (type) => type !== name.replace("typeactivite_", "")
          ),
        };
      } else if (name.startsWith("techniqueProduction_")) {
        newFilters = {
          ...filters,
          list_techniqueprod: filters.list_techniqueprod.filter(
            (type) => type !== name.replace("techniqueProduction_", "")
          ),
        };
      } else if (name.startsWith("typeProduction_")) {
        newFilters = {
          ...filters,
          list_typeprod: filters.list_typeprod.filter(
            (type) => type !== name.replace("typeProduction_", "")
          ),
        };
      }
    }

    // Apply the new filters
    applyFilters(newFilters);
  };

  // Add the selected activity type to the list
  const handleActivitySelect = (event) => {
    const { value } = event.target;
    if (value && !filters.list_typeactivite.includes(value)) {
      const newFilters = {
        ...filters,
        list_typeactivite: [...filters.list_typeactivite, value],
      };
      applyFilters(newFilters);
    }
  };

  // Add the selected production technique to the list
  const handleTechniqueProductionSelect = (event) => {
    const { value } = event.target;
    if (value) {
      const newFilters = {
        ...filters,
        list_techniqueprod: [...filters.list_techniqueprod, value],
      };
      applyFilters(newFilters);
    }
  };

  // Add the selected production type to the list
  const handleProductionTypeSelect = (event) => {
    const { value } = event.target;
    if (value) {
      const newFilters = {
        ...filters,
        list_typeprod: [...filters.list_typeprod, value],
      };
      applyFilters(newFilters);
    }
  };

  // Remove the selected activity type from the list
  const removeActivity = (type) => {
    const newFilters = {
      ...filters,
      list_typeactivite: filters.list_typeactivite.filter(
        (activity) => activity !== type
      ),
    };
    applyFilters(newFilters);
  };

  // Remove the selected production technique from the list
  const removeTechniqueProduction = (type) => {
    const newFilters = {
      ...filters,
      list_techniqueprod: filters.list_techniqueprod.filter(
        (technique) => technique !== type
      ),
    };

    applyFilters(newFilters);
  };

  // Remove the selected production type from the list
  const removeProductionType = (type) => {
    const newFilters = {
      ...filters,
      list_typeprod: filters.list_typeprod.filter(
        (production) => production !== type
      ),
    };

    applyFilters(newFilters);
  };

  // Filter the gardens based on the selected filters
  useEffect(() => {
    setFilteredGardens(
      gardens.filter((garden) => passesFilters(garden, filters))
    );
  }, [gardens, filters]);

  // Check if a garden passes the selected filters
  const passesFilters = (garden, filters) => {
    if (
      filters.list_typeprojet.length === 0 &&
      filters.list_typeactivite.length === 0 &&
      filters.list_techniqueprod.length === 0 &&
      filters.list_typeprod.length === 0
    ) {
      return true;
    }

    const passesProjectType =
      filters.list_typeprojet.length === 0 ||
      filters.list_typeprojet.some((type) =>
        garden.list_typeprojet.includes(type)
      );

    const passesActivityType =
      filters.list_typeactivite.length === 0 ||
      filters.list_typeactivite.some((type) =>
        garden.list_typeactivite.includes(type)
      );

    const passesTechniqueProduction =
      filters.list_techniqueprod.length === 0 ||
      filters.list_techniqueprod.some((type) =>
        garden.list_techniqueprod.includes(type)
      );

    const passesProductionType =
      filters.list_typeprod.length === 0 ||
      filters.list_typeprod.some((type) => garden.list_typeprod.includes(type));

    return (
      passesProjectType &&
      passesActivityType &&
      passesTechniqueProduction &&
      passesProductionType
    );
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "filters" ? "active" : ""}`}
              onClick={() => setActiveTab("filters")}
              href="#"
            >
              <strong>FILTRES</strong>
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "gardens" ? "active" : ""}`}
              onClick={() => setActiveTab("gardens")}
              href="#"
            >
              <strong>JARDINS</strong>{" "}
              {filteredGardens.length > 0 && `(${filteredGardens.length})`}
            </a>
          </li>
        </ul>
      </div>
      <div className="panel-body p-4 text-white">
        {activeTab === "filters" && (
          <form>
            <div className="pb-4">
              <h5 className="light-green-text">Type de projet</h5>
              <div>
                <div className="d-flex justify-content-between">
                  <label className="d-flex align-items-end" htmlFor="typeprojet_jardin-potager">
                    <img
                      src="/assets/icon-jardin-potager.svg"
                      alt="Icon jardin / potager"
                    />
                    <span className="mx-3">Jardin / potager</span>
                  </label>
                  <input
                    className="panel_check-input"
                    type="checkbox"
                    id="typeprojet_jardin-potager"
                    name="typeprojet_jardin-potager"
                    onChange={handleCheckboxChange}
                    checked={filters.list_typeprojet.includes("jardin-potager")}
                  />
                </div>
                <hr />
              </div>
              <div>
                <div className="d-flex justify-content-between">
                  <label className="d-flex align-items-end" htmlFor="typeprojet_ferme-urbaine-participative">
                    <img
                      src="/assets/icon-ferme-urbaine-participative.svg"
                      alt="Icon ferme urbaine participative"
                    />
                    <span className="mx-3">Ferme urbaine participative</span>
                  </label>
                  <input
                    className="panel_check-input"
                    type="checkbox"
                    id="typeprojet_ferme-urbaine-participative"
                    name="typeprojet_ferme-urbaine-participative"
                    onChange={handleCheckboxChange}
                    checked={filters.list_typeprojet.includes(
                      "ferme-urbaine-participative"
                    )}
                  />
                </div>
                <hr />
              </div>
              <div>
                <div className="d-flex justify-content-between">
                  <label className="d-flex align-items-end" htmlFor="typeprojet_ferme-urbaine-specialisee">
                    <img
                      src="/assets/icon-ferme-urbaine-specialisee.svg"
                      alt="Icon ferme urbaine spécialisée"
                    />
                    <span className="mx-3">Ferme urbaine spécialisée</span>
                  </label>
                  <input
                    className="panel_check-input"
                    type="checkbox"
                    id="typeprojet_ferme-urbaine-specialisee"
                    name="typeprojet_ferme-urbaine-specialisee"
                    onChange={handleCheckboxChange}
                    checked={filters.list_typeprojet.includes(
                      "ferme-urbaine-specialisee"
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="pb-4">
              <h5 className="light-green-text">Type d'activité</h5>
              <div className="dropdown">
                <label htmlFor="typeactivite" className="d-none">
                  Type d'activité
                </label>
                <select
                  id="typeactivite"
                  className="panel_select"
                  onChange={handleActivitySelect}
                  value=""
                >
                  <option value="" disabled>
                    Sélectionner
                  </option>
                  {activityTypes.map(
                    (activity) =>
                      !filters.list_typeactivite.includes(activity) && (
                        <option key={activity} value={activity}>
                          {activity}
                        </option>
                      )
                  )}
                </select>
                <div className="selected-activities">
                  {filters.list_typeactivite.map((activity) => (
                    <div key={activity} className="selected-activity">
                      {activity}
                      <button
                        type="button"
                        onClick={() => removeActivity(activity)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pb-4">
              <h5 className="light-green-text">Technique de production</h5>
              <div className="dropdown">
                <label htmlFor="techniqueprod" className="d-none">
                  Technique de production
                </label>
                <select
                  id="techniqueprod"
                  className="panel_select"
                  onChange={handleTechniqueProductionSelect}
                  value=""
                >
                  <option value="" disabled>
                    Sélectionner
                  </option>
                  {productionTechniques.map(
                    (technique) =>
                      !filters.list_techniqueprod.includes(technique) && (
                        <option key={technique} value={technique}>
                          {technique}
                        </option>
                      )
                  )}
                </select>
                <div className="selected-techniques">
                  {filters.list_techniqueprod.map((technique) => (
                    <div key={technique} className="selected-technique">
                      {technique}
                      <button
                        type="button"
                        onClick={() => removeTechniqueProduction(technique)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h5 className="light-green-text">Type de production</h5>
            <div className="dropdown">
              <label htmlFor="typeprod" className="d-none">
                Type de production
              </label>
              <select
                id="typeprod"
                className="panel_select"
                onChange={handleProductionTypeSelect}
                value=""
              >
                <option value="" disabled>
                  Sélectionner
                </option>
                {productionTypes.map(
                  (production) =>
                    !filters.list_typeprod.includes(production) && (
                      <option key={production} value={production}>
                        {production}
                      </option>
                    )
                )}
              </select>
              <div className="selected-productions">
                {filters.list_typeprod.map((production) => (
                  <div key={production} className="selected-production">
                    {production}
                    <button
                      type="button"
                      onClick={() => removeProductionType(production)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </form>
        )}

        {activeTab === "gardens" && (
          <div className="garden-list">
            {filteredGardens.length === 0 ? (
              <div className="d-flex flex-column align-items-center">
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
                <p className="text-white">
                  Aucun jardin ne correspond aux filtres actuels.
                </p>
              </div>
            ) : (
              <ul className="p-0">
                {filteredGardens.map((garden) => (
                  <li key={garden._id}>
                    <div>
                      {garden.list_typeprojet.map((type) => (
                        <div
                          key={type}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <img
                            src={getProjectTypeIcon(type)}
                            alt={type}
                            style={{
                              width: "20px",
                              height: "20px",
                              marginRight: "5px",
                            }}
                          />
                          <p className="m-0">{getProjectTypeLabel(type)}</p>
                        </div>
                      ))}
                    </div>
                    <p>{garden.title}</p>
                    <p>
                      {garden.cp} {garden.ville}
                    </p>
                    <hr />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPanel;
