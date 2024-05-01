import React, { useCallback, useEffect, useState, useRef } from "react";
import { fetchSkiData } from "../services/skiDataService";
import { fetchBestRoute } from "../services/bestRouteService";
import { MapContainer, TileLayer } from "react-leaflet";
import "../App.css";
import LocationMarker from "./LocationMarker";
import SkiAreaDropDown from "./skiareas/SkiAreasDropDown";

import "leaflet/dist/leaflet.css";
import GuideSlider from "./stepByStepGuide/GuideSlider";
import { notifyError } from "../utils/customErrorMessage.js";
import FeatureHandler from "./Map/FeatureHandler";
import GenerateRouteBtn from "./generateRouteBtn/GenerateRouteBtn.jsx";
import PisteLiftsSettings from "./preferences/PisteLiftsSettings.jsx";

/**
 * @CodeScene(disable: *Complex Method*)
 * Ski map component - displays a map with pistes and lifts
 * @returns {JSX.Element} SkiMapComponent
 */
const SkiMapComponent = () => {
  const center = [61.314, 12.1971]; // TODO: Change to the center of the ski resort to be fetched
  const mapRef = useRef(null); // To access the map instance
  const [pistes, setPistes] = useState(null);
  const [lifts, setLifts] = useState(null);
  const [route, setRoute] = useState(null);
  const [mode, setMode] = useState("A");
  const [positionA, setPositionA] = useState(null);
  const [positionB, setPositionB] = useState(null);
  const [wasDragged, setWasDragged] = useState(false);
  const [stepByStepGuide, setStepByStepGuide] = useState([]);
  const [skiAreaId, setSkiAreaId] = useState("65d4a9dbecaa09d942314101");
  const [key, setKey] = useState("65d4a9dbecaa09d942314101");
  const [settings, setSettings] = useState({
    "Button lift": true,
    "Very easy piste": true,
    "Chair lift": true,
    "Easy piste": true,
    "Gondola lift": true,
    "Medium piste": true,
    "T-bar lift": true,
    "Expert piste": true,
    "Lift": true,
  });

  // Fetch the ski data and update the bounds of the map
  const updateBoundsAndFetchData = useCallback(async () => {
    if (!mapRef.current) return;

    const skiData = await fetchSkiData(skiAreaId).catch(console.error);
    if (!skiData) {
      return;
    }

    setPistes(skiData.pistes);
    setLifts(skiData.lifts);

    setKey(skiAreaId);
  }, [skiAreaId]);

  const handleDropdownSelect = (skiAreaId, newCenter) => {
    setSkiAreaId(skiAreaId);

    if (mapRef.current) {
      mapRef.current.flyTo(newCenter);
    }
  };

  const findRoute = async (isBestRoute) => {
    if (!positionA || !positionB) {
        notifyError("Please place the two markers by clicking on the map");
        return;
    }

    setRoute(null);
    const startNode = { lat: positionA.lat, lon: positionA.lng };
    const endNode = { lat: positionB.lat, lon: positionB.lng };

    const routeData = await fetchBestRoute(startNode, endNode, skiAreaId, settings, isBestRoute).catch(console.error);

    if (!routeData) {
        return;
    }

    if (routeData.stepByStepGuide) {
        setStepByStepGuide(routeData.stepByStepGuide);
    }

    const route = {
        geometry: routeData.bestRoute.geometry,
        properties: { ...routeData.bestRoute.properties, name: "Best Route" },
        type: "Feature",
    };
    setRoute(route);
  };

  useEffect(() => {
    if (skiAreaId) {
      updateBoundsAndFetchData();
      setPositionA(null);
      setPositionB(null);
      setMode("A");
      setRoute(null);
    }
  }, [skiAreaId, updateBoundsAndFetchData]);

  return (
    <div className="relative">
      <div className="absolute right-5 bottom-5 z-[10000] w-64">
        <PisteLiftsSettings
          settings={settings}
          setSettings={setSettings}
        />
      </div>
      <div className="absolute right-[100px] top-7 z-[10000]">
        <div className="flex flex-row items-center justify-center align-middle space-x-2">
          <SkiAreaDropDown onSelect={handleDropdownSelect} />
          <GenerateRouteBtn
            bestRoute={() => findRoute(true)}
            shortestRoute={() => findRoute(false)}
          />
        </div>
      </div>
      <GuideSlider guide={stepByStepGuide} />
      <MapContainer
        center={center}
        zoom={13.75}
        zoomSnap={0.25}
        scrollWheelZoom={true}
        whenReady={(mapEvent) => {
          mapRef.current = mapEvent.target;
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <FeatureHandler pistes={pistes} lifts={lifts} route={route} key={key} />
        <LocationMarker
          type="A"
          mode={mode}
          setMode={setMode}
          position={positionA}
          setPosition={setPositionA}
          wasDragged={wasDragged}
          setWasDragged={setWasDragged}
        />
        <LocationMarker
          type="B"
          mode={mode}
          setMode={setMode}
          position={positionB}
          setPosition={setPositionB}
          wasDragged={wasDragged}
          setWasDragged={setWasDragged}
        />
      </MapContainer>
    </div>
  );
};

export default SkiMapComponent;
