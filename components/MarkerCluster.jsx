// components/MarkerCluster.jsx
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import { useMap } from "react-leaflet";

const MarkerCluster = ({ gardens }) => {
  const map = useMap();
  const [markerCluster, setMarkerCluster] = useState(null);

  useEffect(() => {
    if (!map || !gardens || gardens.length === 0) return;

    const markers = gardens.map((garden) =>
      L.marker(garden.location.coordinates.reverse()).bindPopup(
        `<p>${garden.title}</p><p>${garden.ville} ${garden.cp}</p><p>${garden.list_typeprojet}</p>`
      )
    );

    const markerClusterGroup = L.markerClusterGroup();
    markerClusterGroup.addLayers(markers);

    map.addLayer(markerClusterGroup);
    setMarkerCluster(markerClusterGroup);

    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [map, gardens]);

  return null;
};

export default MarkerCluster;
