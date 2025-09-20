// app/page.js
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { callGemini } from '@/lib/ai';

export default function Dashboard() {
  const [schemeResponse, setSchemeResponse] = useState('');

  const askAboutSchemes = async () => {
    const prompt = "भारत सरकार की PM Kisan योजना के बारे में सरल हिंदी में समझाएं।";
    const response = await callGemini(prompt);
    setSchemeResponse(response);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-800">Krishi Mitra Pro</h1>
          <p className="text-gray-600">आपका व्यक्तिगत कृषि सहायक</p>
        </div>
        <Link href="/profile" className="bg-green-100 p-3 rounded-full hover:bg-green-200 transition">
          👤
        </Link>
      </header>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Weather Card */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between">
            <div>
              <p className="font-medium">Gharuan, Punjab</p>
              <p className="text-sm opacity-90">धूप</p>
            </div>
            <p className="text-3xl font-bold">32°C</p>
          </div>
        </div>

        {/* Schemes */}
        <div>
          <h2 className="text-xl font-semibold mb-3">सरकारी योजनाएँ</h2>
          <div className="bg-white p-4 rounded-xl shadow space-y-3 h-48 overflow-y-auto">
            <div><strong className="text-green-700">PM किसान सम्मान निधि</strong><p className="text-sm">सालाना ₹6,000 की सहायता</p></div>
            <div><strong className="text-green-700">फसल बीमा योजना</strong><p className="text-sm">फसल खराब होने पर बीमा</p></div>
          </div>
          <button
            onClick={askAboutSchemes}
            className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            ✨ AI से योजनाओं के बारे में पूछें
          </button>
          {schemeResponse && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-800">
              {schemeResponse}
            </div>
          )}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">त्वरित कार्य</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/diagnose" className="bg-green-50 p-4 rounded-xl text-center hover:bg-green-100 transition cursor-pointer">
          <div className="text-3xl mb-1">🍃</div>
          <p>रोग का पता लगाएं</p>
        </Link>
        <Link href="/irrigation" className="bg-blue-50 p-4 rounded-xl text-center hover:bg-blue-100 transition cursor-pointer">
          <div className="text-3xl mb-1">💧</div>
          <p>सिंचाई</p>
        </Link>
        <Link href="/market" className="bg-yellow-50 p-4 rounded-xl text-center hover:bg-yellow-100 transition cursor-pointer">
          <div className="text-3xl mb-1">📈</div>
          <p>बाजार विश्लेषण</p>
        </Link>
        <Link href="/kendra" className="bg-purple-50 p-4 rounded-xl text-center hover:bg-purple-100 transition cursor-pointer">
          <div className="text-3xl mb-1">📍</div>
          <p>कृषि केंद्र</p>
        </Link>
      </div>

      <div className="mt-6">
        <Link href="/chat" className="block bg-indigo-50 p-4 rounded-xl text-center hover:bg-indigo-100 transition">
          <div className="text-3xl mb-1">💬</div>
          <p className="font-semibold">कृषि मित्र (AI चैट)</p>
        </Link>
      </div>
    </div>
  );
}
