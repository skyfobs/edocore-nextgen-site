import type { Metadata } from 'next';
import CourseTemplate from '@/components/CourseTemplate';

export const metadata: Metadata = {
  title: 'German Language Courses - EduCore Institute',
  description: 'Learn German from beginner to advanced levels with certified instructors.',
};

export default function GermanLanguagePage() {
  return (
    <CourseTemplate
      title="German Language"
      description="[Add course overview and introduction here]"
    />
  );
}
