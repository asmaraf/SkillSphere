# SkillSphere 🚀

SkillSphere is a modern, high-performance online learning platform designed to empower students and professionals to upgrade their skills through industry-expert courses.

## 🔗 Live Demo
Check out the live application here: [SkillSphere Live](https://asmaraf.github.io/SkillSphere/)

## 🎯 Purpose
The purpose of SkillSphere is to provide a seamless, secure, and engaging environment for users to discover and enroll in high-quality courses. It bridges the gap between expert knowledge and eager learners with a premium user experience.

## ✨ Key Features
- **Secure Authentication**: Robust login and registration system powered by `Better Auth`, supporting both Email/Password and Google Social Login.
- **Course Discovery**: Dynamic course listing with search functionality to quickly find relevant topics.
- **Detailed Insights**: Comprehensive course details including curriculum, learning objectives, and instructor information.
- **User Profiles**: Personalized profile management where users can view and update their information.
- **Premium UI/UX**: Built with `DaisyUI` and `TailwindCSS` for a sleek, responsive design with smooth animations powered by `Framer Motion`.
- **Real-time Feedback**: Integrated toast notifications for successful actions and error handling.

## 🛠️ Tech Stack & Packages
- **Framework**: [Next.js 16 (Turbopack)](https://nextjs.org/)
- **Database**: MongoDB
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/introduction)

## 🚀 Getting Started

First, install the dependencies:
```bash
npm install
```

Set up your environment variables in a `.env` file:
```env
DATABASE_URL="mongodb://localhost:27017/skill-sphere"
BETTER_AUTH_SECRET="your_secret"
BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
