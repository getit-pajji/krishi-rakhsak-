// app/kendra/page.js
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function KendraPage() {
  const [location, setLocation] = useState(null);
  const [nearest, setNearest] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(userLoc);

          // Mock nearest Krishi Kendra
          const mockKendra = {
            name: "कृषि विज्ञान केंद्र, SAS नगर",
            address: "सेक्टर 62, मोहाली, पंजाब",
            lat: 30.6405,
            lng: 76.7237
          };
          setNearest(mockKendra);
        },
        () => {
          alert("स्थान एक्सेस अस्वीकृत। कृपया अनुमति दें।");
        }
      );
    }
  }, []);

  const openMaps = () => {
    if (nearest && location) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${nearest.lat},${nearest.lng}`,
        '_blank'
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <Link href="/" className="text-green-600 hover:text-green-800 flex items-center">
          ← वापस डैशबोर्ड
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">निकटतम कृषि विज्ञान केंद्र</h1>

      {nearest ? (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border">
            <h2 className="font-bold text-lg">{nearest.name}</h2>
            <p>{nearest.address}</p>
            <button
              onClick={openMaps}
              className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              रास्ता दिखाएं
            </button>
          </div>
          <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <p>नक्शा यहाँ दिखेगा (Google Maps Embed)</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4">आपका स्थान ढूंढा जा रहा है...</p>
        </div>
      )}
    </div>
  );
}
