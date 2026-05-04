"use client";
import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import coursesData from "@/data/courses.json";
import Link from "next/link";
import { Star, Clock, User, BookOpen, TrendingUp, Award } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const popularCourses = coursesData.slice(0, 3);
  const trendingCourses = coursesData.slice(3, 6);
  const { data: session } = authClient.useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="hero min-h-[70vh] bg-base-200 relative overflow-hidden">
        <div className="hero-content text-center z-10 relative">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Upgrade Your Skills Today 🚀
            </h1>
            <p className="py-6 text-xl md:text-2xl text-base-content/80">
              Learn from Industry Experts and unlock your potential with our world-class courses.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/courses" className="btn btn-primary btn-lg">Explore Courses</Link>
              {mounted && (
                !session ? (
                  <Link href="/register" className="btn btn-outline btn-lg">Join for Free</Link>
                ) : (
                  <Link href="/my-profile" className="btn btn-outline btn-lg">My Profile</Link>
                )
              )}
              {!mounted && (
                <Link href="/register" className="btn btn-outline btn-lg">Join for Free</Link>
              )}
            </div>
          </motion.div>
        </div>
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-secondary/20 rounded-full blur-3xl"></div>
      </section>

      {/* Popular Courses Section */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-2 mb-10 text-center">
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-warning" />
            <h2 className="text-3xl font-bold">Popular Courses 🔥</h2>
          </div>
          <p className="text-base-content/70">Top rated by our students</p>
        </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {popularCourses.map((course) => (
            <motion.div key={course.id} variants={itemVariants} className="card bg-base-100 shadow-xl hover:-translate-y-2 transition-transform duration-300">
              <figure className="h-48 overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              </figure>
              <div className="card-body">
                <div className="badge badge-secondary">{course.category}</div>
                <h2 className="card-title line-clamp-2">{course.title}</h2>
                <div className="flex items-center gap-2 text-sm text-base-content/70 my-2">
                  <User className="w-4 h-4" /> <span>{course.instructor}</span>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4">
                  <div className="flex items-center gap-1 text-warning font-bold">
                    <Star className="w-4 h-4 fill-current" /> {course.rating}
                  </div>
                  <Link href={`/courses/${course.id}`} className="btn btn-primary btn-sm">View Details</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Trending Courses Section */}
      <section className="container mx-auto px-4 bg-base-200 py-16 rounded-3xl">
        <div className="flex flex-col items-center gap-2 mb-10 text-center">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-accent" />
            <h2 className="text-3xl font-bold">Trending Releases 📈</h2>
          </div>
          <p className="text-base-content/70">Hot new courses just added</p>
        </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {trendingCourses.map((course) => (
            <motion.div key={course.id} variants={itemVariants} className="card bg-base-100 shadow-xl border border-base-300">
              <figure className="h-48 overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              </figure>
              <div className="card-body">
                <div className="badge badge-accent">{course.category}</div>
                <h2 className="card-title line-clamp-2">{course.title}</h2>
                <div className="flex items-center justify-between mt-auto pt-4">
                  <div className="flex items-center gap-1 text-base-content/70">
                    <Clock className="w-4 h-4" /> {course.duration}
                  </div>
                  <Link href={`/courses/${course.id}`} className="btn btn-outline btn-sm">View Details</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Learning Tips & Top Instructors Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Learning Tips */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <BookOpen className="w-8 h-8 text-info" />
              <h2 className="text-3xl font-bold">Learning Tips 📌</h2>
            </div>
            <div className="flex flex-col gap-4">
              <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" defaultChecked /> 
                <div className="collapse-title text-xl font-medium">
                  Pomodoro Technique
                </div>
                <div className="collapse-content"> 
                  <p>Study for 25 minutes, then take a 5-minute break. This keeps your mind fresh and focused.</p>
                </div>
              </div>
              <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" /> 
                <div className="collapse-title text-xl font-medium">
                  Active Recall
                </div>
                <div className="collapse-content"> 
                  <p>Instead of just reading, actively test your memory of the concepts to strengthen retention.</p>
                </div>
              </div>
              <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" /> 
                <div className="collapse-title text-xl font-medium">
                  Consistent Schedule
                </div>
                <div className="collapse-content"> 
                  <p>Dedicate a specific time each day for learning to build a strong habit.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Instructors */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <Award className="w-8 h-8 text-secondary" />
              <h2 className="text-3xl font-bold">Top Instructors 🏆</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "John Doe", role: "Web Dev Expert", students: "125K+", img: "https://i.pravatar.cc/150?u=1" },
                { name: "Jane Smith", role: "UI/UX Designer", students: "98K+", img: "https://i.pravatar.cc/150?u=2" },
                { name: "Mike Johnson", role: "Marketing Guru", students: "85K+", img: "https://i.pravatar.cc/150?u=3" },
                { name: "Emily Davis", role: "Data Scientist", students: "110K+", img: "https://i.pravatar.cc/150?u=4" }
              ].map((instructor, i) => (
                <div key={i} className="flex items-center gap-4 bg-base-200 p-4 rounded-xl">
                  <div className="avatar">
                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={instructor.img} alt={instructor.name} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold">{instructor.name}</h3>
                    <p className="text-sm text-base-content/70">{instructor.role}</p>
                    <p className="text-xs text-primary font-semibold mt-1">{instructor.students} Students</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
