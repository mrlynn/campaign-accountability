// src/app/api/promises/route.js
import clientPromise from '../../../../lib/mongodb';

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db('campaignAccountability');

  try {
    const { candidateId, title, description, timeline, links } = await request.json();
    const newPromise = {
      candidateId,
      title,
      description,
      date: new Date(),
      timeline: timeline || null,
      links: links || [],
      verified: false, // Default to unverified
    };

    const result = await db.collection('promises').insertOne(newPromise);
    return new Response(JSON.stringify(result.ops[0]), { status: 201 });
  } catch (error) {
    console.error('Error adding promise:', error);
    return new Response('Error adding promise', { status: 500 });
  }
}
