// app/diagnose/page.js
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function DiagnosePage() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target.result);
      setLoading(true);

      // Mock AI Result after 1.5s
      setTimeout(() => {
        const mockResults = [
          { disease: "टमाटर स्वस्थ", confidence: "98.7%", healthy: true },
          { disease: "आलू का देर से झुलसना", confidence: "92.3%", healthy: false },
          { disease: "गेहूं का क rust", confidence: "87.1%", healthy: false }
        ];
        const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
        setResult(randomResult);
        setLoading(false);
      }, 1500);
    };
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <Link href="/" className="text-green-600 hover:text-green-800 flex items-center">
          ← वापस डैशबोर्ड
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">फसल का विश्लेषण करें</h1>

      {!image && !result && (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
          <div className="text-5xl mb-4">📷</div>
          <p className="mb-4">पत्ती या फसल की तस्वीर अपलोड करें</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="bg-green-600 text-white py-2 px-6 rounded-lg cursor-pointer hover:bg-green-700 transition">
            फ़ाइल चुनें
          </label>
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4">AI से विश्लेषण हो रहा है...</p>
        </div>
      )}

      {result && image && (
        <div className="space-y-4">
          <img src={image} alt="Uploaded" className="w-full rounded-lg" />
          <div className="bg-white p-4 rounded-lg border">
            <p className="font-semibold">परिणाम:</p>
            <p className={`text-xl font-bold ${result.healthy ? 'text-green-600' : 'text-red-600'}`}>
              {result.disease}
            </p>
            <p className="text-green-700">Confidence: {result.confidence}</p>
          </div>
          <button
            onClick={reset}
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
          >
            नई तस्वीर अपलोड करें
          </button>
        </div>
      )}
    </div>
  );
}
