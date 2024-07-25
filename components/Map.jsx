// components/Map.jsx

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster.js";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

// This is a dynamic import for the MapContainer component from react-leaflet
const MapContainer = dynamic(() =>
  import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

// Get the label for the project type
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

const Map = ({ gardens, filters, updateVisibleGardens, onMapLoad }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [customIcons, setCustomIcons] = useState({});
  const [isLoading, setIsLoading] = useState(true); // New state

  // Create the map and add the markers
  useEffect(() => {
    if (typeof window !== "undefined" && !map && gardens.length > 0) {
      const newMap = L.map("map").setView([48.8566, 2.3522], 6);
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(newMap);

      const icons = {};

      gardens.forEach((garden) => {
        const { list_typeprojet } = garden;
        list_typeprojet.forEach((type) => {
          if (!icons[type]) {
            const iconOptions = {
              iconUrl: `/assets/pin-${type}.svg`,
              iconRetinaUrl: `/assets/pin-${type}.svg`,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              tooltipAnchor: [16, -28],
              shadowSize: [41, 41],
            };
            icons[type] = L.icon(iconOptions);
          }
        });
      });

      setCustomIcons(icons);

      const markerCluster = L.markerClusterGroup();
      setMarkers(markerCluster);

      gardens.forEach((garden) => {
        if (passesFilters(garden, filters)) {
          addMarkerToCluster(garden, icons, markerCluster);
        }
      });

      newMap.addLayer(markerCluster);
      setMap(newMap);

      updateVisibleGardens(newMap, gardens);

      newMap.on('moveend', () => updateVisibleGardens(newMap, gardens));
      newMap.on('zoomend', () => updateVisibleGardens(newMap, gardens));

      // Mark the map as loaded
      setIsLoading(false); // Update the state when the map is loaded

      // Notify parent component
      if (onMapLoad) onMapLoad(false);
    }
  }, [map, gardens]);

  // Update the markers when the filters change
  useEffect(() => {
    if (markers && map) {
      markers.clearLayers();
      gardens.forEach((garden) => {
        if (passesFilters(garden, filters)) {
          addMarkerToCluster(garden, customIcons, markers);
        }
      });
    }
  }, [filters]);

  // Add a marker to the cluster
  const addMarkerToCluster = (garden, icons, markerCluster) => {
    const { list_typeprojet } = garden;
    list_typeprojet.forEach((type) => {
      const marker = L.marker(garden.location.coordinates, {
        icon: icons[type],
      }).bindPopup(`
        <p>${garden.title}</p>
        <p>${garden.cp} ${garden.ville}</p>
        <div style="display: flex; align-items: center;">
          <img src="/assets/icon-${type}.svg" style="width: 20px; height: 20px; margin-right: 5px;" alt=${type} />
          <p>${getProjectTypeLabel(type)}</p>
        </div>
      `);
      markerCluster.addLayer(marker);
    });
  };

  // Check if a garden passes the filters
  const passesFilters = (garden, filters) => {
    const { list_typeprojet, list_typeactivite, list_techniqueprod, list_typeprod } = filters;

    const passesProjectType = list_typeprojet.length === 0 || list_typeprojet.some((type) =>
      garden.list_typeprojet.includes(type)
    );

    const passesActivityType = list_typeactivite.length === 0 || list_typeactivite.some((type) =>
      garden.list_typeactivite.includes(type)
    );

    const passesTechniqueProduction = list_techniqueprod.length === 0 || list_techniqueprod.some((type) =>
      garden.list_techniqueprod.includes(type)
    );

    const passesProductType = list_typeprod.length === 0 || list_typeprod.some((type) =>
      garden.list_typeprod.includes(type)
    );

    return passesProjectType && passesActivityType && passesTechniqueProduction && passesProductType;
  };

  return (
    <div>
      <div id="map" />
    </div>
  );
};

export default Map;
