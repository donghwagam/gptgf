import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');

    let query = supabase
      .from('tags')
      .select('id, slug, name')
      .order('name');

    if (search) {
      query = query.or(`name.ilike.%${search}%,slug.ilike.%${search}%`);
    }

    query = query.limit(limit);

    const { data, error } = await query;

    if (error) {
      console.error('Tags fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
    }

    return NextResponse.json({ tags: data });

  } catch (error) {
    console.error('Tags API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}