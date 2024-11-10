// src/app/api/candidates/[id]/route.js
import clientPromise from '../../../../../lib/mongodb';
import { NextResponse } from 'next/server';

import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
    // Destructure `id` from `params`
    const id = params?.id;
  
    // Handle cases where `id` might be undefined
    if (!id) {
      return NextResponse.json({ error: 'Candidate ID is required' }, { status: 400 });
    }
  
    const client = await clientPromise;
    const db = client.db('campaignAccountability');
  
    try {
      // Fetch candidate by ID from MongoDB
      const candidate = await db.collection('candidates').findOne({ _id: new ObjectId(id) });
  
      if (!candidate) {
        return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
      }
  
      return NextResponse.json(candidate);
    } catch (error) {
      console.error('Error fetching candidate:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }

export async function PUT(request, { params }) {
  const client = await clientPromise;
  const db = client.db('campaignAccountability');

  try {
    const body = await request.json();
    const result = await db.collection('candidates').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: body }
    );
    if (result.matchedCount === 0) return new Response('Candidate not found', { status: 404 });
    return new Response('Candidate updated successfully', { status: 200 });
  } catch (error) {
    console.error('Error updating candidate:', error);
    return new Response('Error updating candidate', { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const client = await clientPromise;
  const db = client.db('campaignAccountability');

  try {
    const result = await db.collection('candidates').deleteOne({ _id: new ObjectId(params.id) });
    if (result.deletedCount === 0) return new Response('Candidate not found', { status: 404 });
    return new Response('Candidate deleted successfully', { status: 200 });
  } catch (error) {
    console.error('Error deleting candidate:', error);
    return new Response('Error deleting candidate', { status: 500 });
  }
}
