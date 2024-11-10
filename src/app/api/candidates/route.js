// src/app/api/candidates/route.js
import clientPromise from '../../../../lib/mongodb';

export async function GET(request) {
  const client = await clientPromise;
  const db = client.db('campaignAccountability');

  try {
    const candidates = await db.collection('candidates').find({}).toArray();
    return new Response(JSON.stringify(candidates), { status: 200 });
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return new Response('Error fetching candidates', { status: 500 });
  }
}

export async function POST(request) {
    const client = await clientPromise;
    const db = client.db('campaignAccountability');
  
    try {
      const body = await request.json();
      const result = await db.collection('candidates').insertOne(body);
      return new Response(JSON.stringify(result.ops[0]), { status: 201 });
    } catch (error) {
      console.error('Error creating candidate:', error);
      return new Response(JSON.stringify({ message: 'Error creating candidate' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }
