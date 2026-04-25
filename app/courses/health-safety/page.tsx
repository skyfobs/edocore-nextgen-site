import type { Metadata } from 'next';
import CourseTemplate from '@/components/CourseTemplate';

export const metadata: Metadata = {
  title: 'Health & Safety Training Courses - EduCore Institute',
  description: 'Professional health and safety training courses and certification programs.',
};

export default function HealthSafetyPage() {
  return (
    <CourseTemplate
      title="Health & Safety Training"
      description="[Add course overview and introduction here]"
    />
  );
}
