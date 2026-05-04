import { BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-base-200 text-base-content">
      {/* Main footer columns */}
      <div className="w-full px-6 md:px-12 lg:px-20 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-primary" />
              <span className="font-bold text-2xl text-primary">SkillSphere</span>
            </div>
            <p className="text-sm text-base-content/70 leading-relaxed">
              SkillSphere Online Learning Ltd.<br />
              Providing reliable tech education since 2026.
            </p>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-3">
            <h6 className="font-bold text-sm uppercase tracking-widest text-base-content/50">Services</h6>
            <a className="link link-hover text-sm">Web Development</a>
            <a className="link link-hover text-sm">Design</a>
            <a className="link link-hover text-sm">Marketing</a>
            <a className="link link-hover text-sm">Data Science</a>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <h6 className="font-bold text-sm uppercase tracking-widest text-base-content/50">Company</h6>
            <a className="link link-hover text-sm">About us</a>
            <a className="link link-hover text-sm">Contact</a>
            <a className="link link-hover text-sm">Jobs</a>
            <a className="link link-hover text-sm">Press kit</a>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h6 className="font-bold text-sm uppercase tracking-widest text-base-content/50">Legal</h6>
            <a className="link link-hover text-sm">Terms of use</a>
            <a className="link link-hover text-sm">Privacy policy</a>
            <a className="link link-hover text-sm">Cookie policy</a>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="w-full border-t border-base-300 bg-base-300 py-4 px-6 text-center text-sm text-base-content/60">
        Copyright © {new Date().getFullYear()} SkillSphere. All rights reserved.
      </div>
    </footer>
  );
}
