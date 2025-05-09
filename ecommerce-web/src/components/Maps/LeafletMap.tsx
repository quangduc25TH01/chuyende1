"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { information } from "@/config/data/information";

interface MapConfig {
  center: [number, number];
  zoom: number;
  marker: [number, number];
}

interface LeafletMapProps {
  config?: Partial<MapConfig>;
  height?: string | number;
  width?: string | number;
  className?: string;
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  config,
  height = "100%",
  width = "100%",
  className = "",
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // State cho vị trí mặc định
  const [defaultPosition, setDefaultPosition] = useState<[number, number]>([
    10.85, 106.62,
  ]);
  const [isLoading, setIsLoading] = useState(true);

  // Config mặc định sẽ được update sau khi có vị trí hiện tại
  const defaultConfig: MapConfig = {
    center: defaultPosition,
    zoom: 13,
    marker: defaultPosition,
  };

  const mapConfig: MapConfig = {
    ...defaultConfig,
    ...config,
  };

  // Hàm lấy vị trí hiện tại
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentPosition: [number, number] = [latitude, longitude];

        // Cập nhật vị trí mặc định
        setDefaultPosition(currentPosition);

        // Cập nhật map và marker
        if (mapRef.current) {
          mapRef.current.setView(currentPosition, 16);

          if (markerRef.current) {
            markerRef.current.setLatLng(currentPosition);
          } else {
            markerRef.current = L.marker(currentPosition)
              .addTo(mapRef.current)
              .bindPopup("Vị trí của bạn")
              .openPopup();
          }
        }

        setIsLoading(false);
      },
      (error) => {
        console.log("Error getting location:", error);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    // Fix Leaflet's icon paths
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: markerIcon.src,
      iconRetinaUrl: markerIcon2x.src,
      shadowUrl: markerShadow.src,
    });

    // Lấy vị trí hiện tại trước khi khởi tạo map
    getCurrentLocation();
  }, []);

  // Effect riêng để khởi tạo map sau khi có vị trí
  useEffect(() => {
    if (!mapRef.current && !isLoading) {
      mapRef.current = L.map("map").setView(defaultPosition, mapConfig.zoom);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);

      markerRef.current = L.marker(defaultPosition)
        .addTo(mapRef.current)
        .bindPopup("Vị trí của bạn")
        .openPopup();
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [defaultPosition, isLoading, mapConfig.zoom]);

  // Loading state
  if (isLoading) {
    return (
      <div
        style={{ height, width }}
        className={`${className} flex items-center justify-center bg-gray-100`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-main mx-auto mb-2"></div>
          <p>Đang tìm vị trí của {information.shopName}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        id="map"
        className="map-container"
        style={{
          height,
          width,
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* <button
        onClick={getCurrentLocation}
        className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-lg z-[400] hover:bg-gray-100"
      >
        Cập nhật vị trí
      </button> */}

      {/* <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-lg z-[400]">
        <p>Vĩ độ: {defaultPosition[0].toFixed(6)}</p>
        <p>Kinh độ: {defaultPosition[1].toFixed(6)}</p>
      </div> */}
    </div>
  );
};

export default LeafletMap;
