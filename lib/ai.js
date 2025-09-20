// lib/ai.js
export async function callGemini(prompt) {
  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!res.ok) throw new Error(await res.text());

    const data = await res.json();
    return data.response;
  } catch (error) {
    console.error('AI Error:', error);
    return "माफ़ कीजिए, AI सर्वर अभी व्यस्त है। कृपया बाद में प्रयास करें।";
  }
}
