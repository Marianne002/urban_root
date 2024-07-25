// app/carte/page.jsx
"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import MapPanel from "@/components/MapPanel";
import Navbar from "@/components/Navbar";
import Loader from "@components/Loader";

const DynamicMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

const Carte = () => {
  const [filters, setFilters] = useState({
    list_typeprojet: [],
    list_typeactivite: [],
    list_techniqueprod: [],
    list_typeprod: [],
  });
  const [gardens, setGardens] = useState([]);
  const [visibleGardens, setVisibleGardens] = useState([]);
  const [mapLoading, setMapLoading] = useState(true);

  // Fetch gardens from the API
  useEffect(() => {
    const fetchGardens = async () => {
      try {
        const response = await fetch("/api/garden");
        const data = await response.json();
        setGardens(data);
      } catch (error) {
        console.error("Error fetching gardens:", error);
      }
    };

    fetchGardens();
  }, []);

  // Update the visible gardens when the map moves
  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  // Update the visible gardens when the map moves
  const updateVisibleGardens = (map, gardens) => {
    const bounds = map.getBounds();
    const visible = gardens.filter((garden) =>
      bounds.contains(garden.location.coordinates)
    );
    setVisibleGardens(visible);
  };

  const handleMapLoad = (loading) => {
    setMapLoading(loading);
  };

  return (
    <>
      <title>Carte - Urban Root</title>
      <meta name="description" content="Carte des jardins urbains." />
      <meta
        name="keywords"
        content="jardin urbain, éco-responsabilité, espaces verts"
      />

      <Navbar />
      <div className="navbar-padding-protection"></div>

      <div className="row m-0">
        <div className="col-md-8 col-sm-12 p-0">
          {mapLoading && <Loader />}
          <DynamicMap
            gardens={gardens}
            filters={filters}
            updateVisibleGardens={updateVisibleGardens}
            onMapLoad={handleMapLoad}
          />
        </div>
        <div className="col-md-4 col-sm-12 p-0">
          <MapPanel
            applyFilters={applyFilters}
            gardens={visibleGardens}
            filters={filters}
          />
        </div>
      </div>
    </>
  );
};

export default Carte;
