// File: src/app/api/data/route.js

import { NextResponse } from 'next/server';

export async function GET(request) {
  // In a real app, you would fetch data from a database
  // or call another API here.

  const sampleData = {
    message: "Hello from the backend API!",
    team: "Hack-Hers 2025",
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(sampleData);
}