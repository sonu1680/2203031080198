"use client";

import React, { useState, FormEvent } from "react";
import axios from "axios";
import "./style.css";

interface ClickHistoryEntry {
  clickedAt: string;
  ip: string;
  userAgent: string;
}

interface LinkDetail {
  fullLink: string;
  shortLink: string;
  clicks: number;
  expiry: string;
  clickHistory: ClickHistoryEntry[];
}

export default function ClickHistoryPage() {
  const [shortUrl, setShortUrl] = useState("");
  const [data, setData] = useState<LinkDetail | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setData(null);
    setError("");

    try {
      const shortCode = shortUrl.split("/").pop(); 
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/link/${shortCode}`
      );
      setData(data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch link details.");
    }
  };

  return (
    <div className="container">
      <h1>📊 Link Click History</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter short URL"
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
          required
        />
        <button type="submit">Get Details</button>
      </form>

      {error && <p className="error">{error}</p>}

      {data && (
        <div className="result">
          <p>
            <strong>Original URL:</strong> {data.fullLink}
          </p>
          <p>
            <strong>Short URL:</strong>{" "}
            <a href={data.shortLink} target="_blank">
              {data.shortLink}
            </a>
          </p>
          <p>
            <strong>Expires At:</strong>{" "}
            {new Date(data.expiry).toLocaleString()}
          </p>
          <p>
            <strong>Total Clicks:</strong> {data.clicks}
          </p>

          <h3>Click History:</h3>
          {data.clickHistory.length === 0 ? (
            <p>No clicks yet.</p>
          ) : (
            <ul>
              {data.clickHistory.map((click, index) => (
                <li key={index}>
                  <p>Date: {new Date(click.clickedAt).toLocaleString()}</p>
                  <p>IP: {click.ip}</p>
                  <hr />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
