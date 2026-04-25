import type { Metadata } from 'next';
import CourseTemplate from '@/components/CourseTemplate';

export const metadata: Metadata = {
  title: 'AI Consultancy Courses - EduCore Institute',
  description: 'Expert training in artificial intelligence, machine learning, and AI consultancy services.',
};

export default function AIConsultancyPage() {
  return (
    <CourseTemplate
      title="AI Consultancy"
      description="[Add course overview and introduction here]"
    />
  );
}
