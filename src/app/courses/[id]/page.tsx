import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import coursesData from "@/data/courses.json";
import { Star, Clock, User, CheckCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const { id } = await params;

  if (!session) {
    redirect(`/login?callbackUrl=/courses/${id}`);
  }

  const course = coursesData.find((c) => c.id === parseInt(id));

  if (!course) {
    notFound();
  }

  const curriculum = [
    `Introduction to ${course.category}`,
    "Setting up your Development Environment",
    "Core Concepts and Fundamentals",
    "Hands-on Practice Projects",
    "Advanced Techniques and Best Practices",
    "Real-World Project Build",
    "Testing and Debugging",
    "Deployment and Next Steps",
  ];

  const whatYouLearn = [
    `Master the fundamentals of ${course.category}`,
    `Build real-world projects with ${course.instructor}\'s guidance`,
    "Apply best practices used by industry professionals",
    "Gain confidence to work on your own projects",
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl min-h-screen">
      <Link href="/courses" className="btn btn-ghost mb-6">← Back to Courses</Link>
      
      <div className="bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-base-200">
        <div className="relative h-64 md:h-96">
          <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
            <div className="text-white">
              <div className="flex gap-2 mb-4">
                <span className="badge badge-primary">{course.category}</span>
                <span className="badge badge-outline text-white border-white">{course.level}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" /> <span>{course.instructor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" /> <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-warning font-bold">
                  <Star className="w-5 h-5 fill-current" /> <span>{course.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Course Description</h2>
            <p className="text-base-content/80 text-lg leading-relaxed mb-8">
              {course.description}
            </p>

            <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
            <ul className="space-y-4">
              {curriculum.map((item, index) => (
                <li key={index} className="flex items-center gap-4 bg-base-200 p-4 rounded-xl">
                  <div className="bg-primary text-primary-content w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <div className="bg-base-200 p-6 rounded-2xl sticky top-24">
              <h3 className="text-xl font-bold mb-4">What you'll learn</h3>
              <ul className="space-y-3 mb-8">
                {whatYouLearn.map((item, i) => (
                  <li key={i} className="flex gap-3 text-base-content/80">
                    <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary w-full btn-lg">Enroll Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
