// src/app/api/ai-suggestions/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
  const { title, candidateName, electionYear } = await request.json();

  const prompt = `
    Generate a detailed description, background context, and potential sources for the following political promise: "${title}" made by ${candidateName} during the ${electionYear} election. Include possible references or suggestions for where users might find additional information. 
    Additionally, suggest a refined title if possible. Format your response as a JSON object with the following structure:

    {
      "suggestedTitle": "Your refined title here",
      "backgroundContext": "Brief background context here",
      "detailedDescription": "Detailed description here",
      "sources": [
        {"text": "Description of source 1", "url": "https://link1.com"},
        {"text": "Description of source 2", "url": "https://link2.com"}
      ]
    }

    Ensure all sources have both a "text" and "url" field.
  `;

  try {
    const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!openAiResponse.ok) {
      const errorText = await openAiResponse.text();
      console.error("OpenAI API request failed:", errorText);
      return NextResponse.json({ error: "Failed to fetch AI suggestions from OpenAI" }, { status: openAiResponse.status });
    }

    const openAiData = await openAiResponse.json();
    const generatedText = openAiData.choices?.[0]?.message?.content.trim() || "{}";

    // Attempt to parse JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(generatedText);
    } catch (error) {
      console.error("Error parsing AI response as JSON:", error);
      return NextResponse.json({ error: "Invalid response format from AI" }, { status: 500 });
    }

    const { suggestedTitle, backgroundContext, detailedDescription, sources } = parsedResponse;

    return NextResponse.json({
      suggestedTitle,
      description: `${backgroundContext}\n\n${detailedDescription}`, // Combine for description field
      potentialSources: sources,
    });
  } catch (error) {
    console.error("Unexpected error fetching AI suggestions:", error);
    return NextResponse.json({ error: "Failed to fetch AI suggestions" }, { status: 500 });
  }
}
