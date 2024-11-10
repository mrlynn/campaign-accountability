// src/app/candidates/[id]/components/PromiseForm.js

"use client";

import { useState } from 'react';

export default function PromiseForm({ candidateId, candidateName, electionYear, onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeline, setTimeline] = useState('');
  const [links, setLinks] = useState([]);
  const [linkInput, setLinkInput] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  const fetchAiSuggestions = async () => {
    setLoadingAi(true);
    try {
      const response = await fetch('/api/ai-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          candidateName,
          electionYear,
        }),
      });

      if (response.ok) {
        const { suggestedTitle, description: aiDescription, potentialSources } = await response.json();

        if (suggestedTitle) setTitle(suggestedTitle);
        if (aiDescription) setDescription(aiDescription);
        if (potentialSources) setLinks(potentialSources.map(source => ({ url: source.url, text: source.text })));
      } else {
        console.error("Failed to fetch AI suggestions");
      }
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
    } finally {
      setLoadingAi(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/promises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateId,
          title,
          description,
          timeline,
          links: links.map(link => link.url), // Submit only URLs
        }),
      });

      if (response.ok) {
        setTitle('');
        setDescription('');
        setTimeline('');
        setLinks([]);
        setLinkInput('');
        onSuccess();
      } else {
        console.error("Failed to submit promise");
      }
    } catch (error) {
      console.error("Error submitting promise:", error);
    }
  };

  const addLink = () => {
    if (linkInput) {
      setLinks([...links, { url: linkInput, text: linkInput }]);
      setLinkInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border border-gray-300 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add a Promise</h2>

      <label className="block mb-2">
        Title:
        <div className="flex items-center">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <button
            type="button"
            onClick={fetchAiSuggestions}
            className="ml-2 bg-blue-500 text-white p-2 rounded"
            disabled={loadingAi}
          >
            {loadingAi ? "Searching..." : "AI Assist"}
          </button>
        </div>
      </label>

      <label className="block mb-2">
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </label>

      <label className="block mb-2">
        Timeline (optional):
        <input
          type="text"
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </label>

      <label className="block mb-2">
        Supporting Links:
        <div className="flex items-center">
          <input
            type="url"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            placeholder="https://example.com"
            className="border p-2 rounded w-full"
          />
          <button type="button" onClick={addLink} className="ml-2 bg-blue-500 text-white p-2 rounded">
            Add Link
          </button>
        </div>
        {links.length > 0 && (
          <ul className="mt-2">
            {links.map((link, index) => (
              <li key={index} className="text-sm">
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </label>

      <button type="submit" className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
        Submit Promise
      </button>
    </form>
  );
}
