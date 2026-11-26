import type { Course, CourseBlock, CourseLesson } from '@/data/courseData';

export type BlockAnswer = string | string[] | boolean;
export type AnswerMap = Record<string, BlockAnswer | undefined>;

export interface CourseEntitlements {
  purchasedCourseIds: string[];
  proActive: boolean;
}

export interface StoredCourseProgress {
  purchasedCourseIds: string[];
  completedLessonIds: string[];
  answers: AnswerMap;
  completedBlockIds: string[];
  lastLessonId: string;
}

export const emptyCourseProgress: StoredCourseProgress = {
  purchasedCourseIds: [],
  completedLessonIds: [],
  answers: {},
  completedBlockIds: [],
  lastLessonId: 'intro',
};

export function hasCourseAccess(entitlements: CourseEntitlements, courseId: string) {
  return entitlements.purchasedCourseIds.includes(courseId);
}

export function isLessonUnlocked(course: Course, lessonIndex: number, completedLessonIds: string[]) {
  if (lessonIndex <= 0) return true;
  const previous = course.lessons[lessonIndex - 1];
  return Boolean(previous && completedLessonIds.includes(previous.id));
}

export function isBlockReady(block: CourseBlock, answer: BlockAnswer | undefined, completedBlockIds: string[]) {
  if (block.type === 'text' || block.type === 'image' || block.type === 'materials') return true;
  if (block.type === 'video') return answer === true || completedBlockIds.includes(block.id);
  if (block.type === 'quiz' || block.type === 'survey') return typeof answer === 'string' && answer.length > 0;
  if (block.type === 'task') return typeof answer === 'string' && answer.trim().length >= 3;
  const selected = Array.isArray(answer) ? answer : [];
  return block.items.filter(item => !item.optional).every(item => selected.includes(item.id));
}

export function isLessonReady(lesson: CourseLesson, answers: AnswerMap, completedBlockIds: string[]) {
  return lesson.blocks.every(block => isBlockReady(block, answers[block.id], completedBlockIds));
}

export function getNextLesson(course: Course, completedLessonIds: string[]) {
  return course.lessons.find(lesson => !completedLessonIds.includes(lesson.id)) ?? course.lessons[course.lessons.length - 1];
}

export function getCourseProgress(course: Course, completedLessonIds: string[]) {
  const completed = course.lessons.filter(lesson => completedLessonIds.includes(lesson.id)).length;
  return Math.round((completed / course.lessons.length) * 100);
}
