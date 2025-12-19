import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(_request: NextRequest) {
  try {
    // Check database connection
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        {
          status: 'error',
          timestamp: new Date().toISOString(),
          checks: {
            database: {
              status: 'error',
              message: 'Database configuration missing',
            },
            environment: {
              status: 'error',
              message: 'Required environment variables not set',
            },
          },
        },
        { status: 503 }
      );
    }

    // Test database connectivity
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { error } = await supabase.from('_health_check').select('*').limit(1);

    // PGRST116: Bucket or table not found (PostgREST)
    // 42P01: undefined_table (Postgres)
    const isTableMissing = error?.code === 'PGRST116' || error?.message?.includes('42P01');
    const dbStatus = isTableMissing || !error ? 'ok' : 'error';
    const dbMessage = isTableMissing
      ? 'Database connection successful (schema not yet initialized)'
      : error?.message || 'Database connection successful';

    // Check environment variables
    const requiredEnvVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY',
      'NEXTAUTH_URL',
      'NEXTAUTH_SECRET',
    ];

    const envStatus = requiredEnvVars.every((varName) => process.env[varName])
      ? 'ok'
      : 'error';
    const missingVars = requiredEnvVars.filter(
      (varName) => !process.env[varName]
    );

    // Overall health status
    const overallStatus =
      dbStatus === 'ok' && envStatus === 'ok' ? 'ok' : 'degraded';

    return NextResponse.json({
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '0.1.0',
      checks: {
        database: { status: dbStatus, message: dbMessage },
        environment: {
          status: envStatus,
          message:
            envStatus === 'ok'
              ? 'All required environment variables set'
              : `Missing environment variables: ${missingVars.join(', ')}`,
        },
        uptime: { status: 'ok', seconds: process.uptime() },
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
