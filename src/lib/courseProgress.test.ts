import { describe, expect, it } from 'vitest';
import { pilotCourse } from '@/data/courseData';
import { getCourseProgress, hasCourseAccess, isBlockReady, isLessonUnlocked } from './courseProgress';

describe('course access and progress', () => {
  it('does not unlock a paid course with PRO alone', () => {
    expect(hasCourseAccess({ purchasedCourseIds: [], proActive: true }, 'evening-eating')).toBe(false);
  });

  it('unlocks a purchased course without PRO', () => {
    expect(hasCourseAccess({ purchasedCourseIds: ['evening-eating'], proActive: false }, 'evening-eating')).toBe(true);
  });

  it('opens the second lesson only after the introduction is completed', () => {
    expect(isLessonUnlocked(pilotCourse, 1, [])).toBe(false);
    expect(isLessonUnlocked(pilotCourse, 1, ['intro'])).toBe(true);
  });

  it('requires every non-optional checklist item', () => {
    const block = pilotCourse.lessons[3].blocks[2];
    expect(block.type).toBe('checklist');
    if (block.type !== 'checklist') return;
    expect(isBlockReady(block, ['breakfast', 'lunch', 'snack'], [])).toBe(true);
    expect(isBlockReady(block, ['breakfast', 'lunch', 'water'], [])).toBe(false);
  });

  it('counts only completed course lessons in the percentage', () => {
    expect(getCourseProgress(pilotCourse, ['intro', 'lesson-1'])).toBe(33);
    expect(getCourseProgress(pilotCourse, pilotCourse.lessons.map(lesson => lesson.id))).toBe(100);
  });
});
