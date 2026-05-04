"use client";

import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { BookOpen } from 'lucide-react';

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-8">
      <div className="navbar-start w-auto flex-1">
        <Link href="/" className="btn btn-ghost text-xl flex items-center gap-2 justify-start px-0 md:px-4">
          <BookOpen className="w-6 h-6 text-primary" />
          <span className="font-bold text-primary">SkillSphere</span>
        </Link>
      </div>
      
      <div className="navbar-end w-auto flex-none gap-2">
        <div className="hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/courses">Courses</Link></li>
            {session && <li><Link href="/my-profile">My Profile</Link></li>}
          </ul>
        </div>
        
        <div className="flex items-center gap-2 ml-2">
          {!isPending && !session ? (
            <>
              <Link href="/login" className="btn btn-ghost">Login</Link>
              <Link href="/register" className="btn btn-primary">Register</Link>
            </>
          ) : session ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {session.user.image ? (
                    <img alt="Avatar" src={session.user.image} referrerPolicy="no-referrer" />
                  ) : (
                    <span className="text-xl font-bold">{session.user.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li className="md:hidden"><Link href="/">Home</Link></li>
                <li className="md:hidden"><Link href="/courses">Courses</Link></li>
                <li><Link href="/my-profile">My Profile</Link></li>
                <li><button onClick={handleLogout} className="text-error">Logout</button></li>
              </ul>
            </div>
          ) : (
            <div className="skeleton w-10 h-10 rounded-full"></div>
          )}
        </div>
      </div>
    </div>
  );
}
