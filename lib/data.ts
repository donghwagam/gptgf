import type { Tag, Character, Creator } from '@/types';
import { mockTags, mockCharacters, mockCreators } from './mock-data';

export class DataRepository {
  /**
   * 모든 태그를 반환합니다
   */
  static getTags(): Tag[] {
    return mockTags;
  }

  /**
   * 슬러그로 태그를 찾습니다
   */
  static getTagBySlug(slug: string): Tag | undefined {
    return mockTags.find(tag => tag.slug === slug);
  }

  /**
   * 모든 캐릭터를 반환합니다
   */
  static getCharacters(): Character[] {
    return mockCharacters;
  }

  /**
   * 태그로 필터링된 캐릭터를 반환합니다
   */
  static getCharactersByTag(tagSlug: string): Character[] {
    return mockCharacters.filter(character => 
      character.tags.includes(tagSlug)
    );
  }

  /**
   * NSFW 필터를 적용한 캐릭터를 반환합니다
   */
  static getCharactersFiltered(showNsfw: boolean): Character[] {
    return showNsfw 
      ? mockCharacters 
      : mockCharacters.filter(character => !character.nsfw);
  }

  /**
   * 슬러그로 캐릭터를 찾습니다
   */
  static getCharacterBySlug(slug: string): Character | undefined {
    return mockCharacters.find(character => character.slug === slug);
  }

  /**
   * 모든 크리에이터를 반환합니다
   */
  static getCreators(): Creator[] {
    return mockCreators;
  }

  /**
   * 점수순으로 정렬된 상위 크리에이터를 반환합니다
   */
  static getTopCreators(): Creator[] {
    return [...mockCreators].sort((a, b) => {
      const scoreA = parseFloat(a.score.replace('K', ''));
      const scoreB = parseFloat(b.score.replace('K', ''));
      return scoreB - scoreA;
    });
  }
}