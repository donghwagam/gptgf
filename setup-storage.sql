-- Supabase Storage 버킷 설정을 위한 SQL
-- Supabase 대시보드의 SQL Editor에서 실행

-- character-avatars 버킷 생성 (이미 있으면 무시)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'character-avatars',
  'character-avatars', 
  true, -- public access for avatars
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- RLS 정책 설정
-- 누구나 아바타 이미지를 볼 수 있음
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'character-avatars');

-- 인증된 사용자만 업로드 가능
CREATE POLICY "Authenticated users can upload avatars" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'character-avatars' 
  AND auth.uid() IS NOT NULL
);

-- 자신이 업로드한 이미지만 수정 가능
CREATE POLICY "Users can update own avatars" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'character-avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- 자신이 업로드한 이미지만 삭제 가능
CREATE POLICY "Users can delete own avatars" ON storage.objects
FOR DELETE USING (
  bucket_id = 'character-avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);