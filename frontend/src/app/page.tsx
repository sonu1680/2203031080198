"use client";
import React, { useState, FormEvent } from "react";
import axios from "axios";
import "./App.css";
import { useRouter } from "next/navigation";

interface ShortLinkResult {
  fullLink: string;
  shortLink: string;
  expiresAt: string;
}

const App: React.FC = () => {
  const router=useRouter();
  const [url, setUrl] = useState<string>("");
  const [expiryIn, setExpiryIn] = useState<string>("");
  const [result, setResult] = useState<ShortLinkResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setResult(null);
    setError("");

    if (!url) {
      setError("URL is required.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/shorturls`,
        {
          url,
          expiryIn: expiryIn ? parseInt(expiryIn) : undefined,
        }
      );

      setResult(data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Unexpected error");
    }
  };

  return (
    <div className="container">
      <button type="submit" onClick={()=>router.push("/history")} >Get Clik-History</button>

      <h1> URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter a long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Expiry in minutes (optional)"
          value={expiryIn}
          onChange={(e) => setExpiryIn(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <p>
            <strong>Original URL:</strong> {result.fullLink}
          </p>
          <p>
            <strong>Short URL:</strong>{" "}
            <a
              href={result.shortLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {result.shortLink}
            </a>
          </p>
          <p>
            <strong>Expires At:</strong>{" "}
            {new Date(result.expiresAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
