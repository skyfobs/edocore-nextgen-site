import type { Metadata } from 'next';
import CourseTemplate from '@/components/CourseTemplate';

export const metadata: Metadata = {
  title: 'Cloud Consultancy Courses - EduCore Institute',
  description: 'Cloud computing and infrastructure management courses with industry certifications.',
};

export default function CloudConsultancyPage() {
  return (
    <CourseTemplate
      title="Cloud Consultancy"
      description="[Add course overview and introduction here]"
    />
  );
}
