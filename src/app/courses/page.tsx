"use client";

import { useState } from "react";
import coursesData from "@/data/courses.json";
import Link from "next/link";
import { Star, Clock, User, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = coursesData.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">All Courses</h1>
          <p className="text-base-content/70">Explore our comprehensive library of courses</p>
        </div>
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search courses by title..."
            className="input input-bordered w-full pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="w-5 h-5 absolute left-3 top-3 text-base-content/50" />
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-2xl font-semibold mb-2">No courses found</h3>
          <p className="text-base-content/70">Try adjusting your search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card bg-base-100 shadow-xl border border-base-200"
            >
              <figure className="h-48 overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              </figure>
              <div className="card-body">
                <div className="flex justify-between items-center mb-2">
                  <div className="badge badge-primary">{course.category}</div>
                  <div className="badge badge-outline">{course.level}</div>
                </div>
                <h2 className="card-title line-clamp-2">{course.title}</h2>
                <div className="flex items-center gap-2 text-sm text-base-content/70 my-2">
                  <User className="w-4 h-4" /> <span>{course.instructor}</span>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-base-200">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 text-warning font-bold text-sm">
                      <Star className="w-4 h-4 fill-current" /> {course.rating}
                    </div>
                    <div className="flex items-center gap-1 text-base-content/70 text-sm">
                      <Clock className="w-4 h-4" /> {course.duration}
                    </div>
                  </div>
                  <Link href={`/courses/${course.id}`} className="btn btn-primary btn-sm">View Course</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
