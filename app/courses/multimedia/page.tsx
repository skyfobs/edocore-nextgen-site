import type { Metadata } from 'next';
import CourseTemplate from '@/components/CourseTemplate';

export const metadata: Metadata = {
  title: 'Multimedia Courses - EduCore Institute',
  description: 'Creative multimedia design and production training courses.',
};

export default function MultimediaPage() {
  return (
    <CourseTemplate
      title="Multimedia"
      description="[Add course overview and introduction here]"
    />
  );
}
