import { NextResponse } from 'next/server';

// Health check endpoint for Docker and monitoring
export async function GET() {
  try {
    // Basic health check - return 200 if service is running
    return NextResponse.json(
      {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: 'Service unavailable',
      },
      { status: 503 }
    );
  }
}
