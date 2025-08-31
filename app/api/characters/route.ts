import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 인증 확인
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 슬러그 생성 (이름을 URL-safe하게 변환)
    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') + '-' + Date.now();

    // 캐릭터 데이터 준비
    const characterData = {
      slug,
      name: body.name,
      age: body.age,
      avatar_url: body.avatar_url || '/default-avatar.png',
      synopsis: body.description || '',
      description: `${body.personality || ''}\n\n${body.scenario || ''}\n\n${body.firstMessage || ''}`,
      creator_id: user.id,
      nsfw: body.nsfw || false,
      premium: false,
      has_video: false,
      likes_count: 0,
      comments_count: 0,
      views_count: '0'
    };

    // 캐릭터 생성
    const { data: character, error: characterError } = await supabase
      .from('characters')
      .insert(characterData)
      .select()
      .single();

    if (characterError) {
      console.error('Character creation error:', characterError);
      return NextResponse.json({ error: 'Failed to create character' }, { status: 500 });
    }

    // 태그 연결
    if (body.tags && body.tags.length > 0) {
      // 태그 슬러그로 태그 ID 조회
      const { data: tags, error: tagsError } = await supabase
        .from('tags')
        .select('id, slug')
        .in('slug', body.tags);

      if (!tagsError && tags && tags.length > 0) {
        const characterTags = tags.map(tag => ({
          character_id: character.id,
          tag_id: tag.id
        }));

        await supabase
          .from('character_tags')
          .insert(characterTags);
      }
    }

    return NextResponse.json({ 
      success: true, 
      character: {
        id: character.id,
        slug: character.slug,
        name: character.name
      }
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const creatorId = searchParams.get('creator_id');
    
    let query = supabase
      .from('characters')
      .select(`
        *,
        users!characters_creator_id_fkey(username, avatar_url),
        character_tags(
          tags(name, slug)
        )
      `)
      .order('created_at', { ascending: false });

    if (creatorId) {
      query = query.eq('creator_id', creatorId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch characters' }, { status: 500 });
    }

    return NextResponse.json({ characters: data });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}