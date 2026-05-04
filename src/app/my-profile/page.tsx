import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { User, Mail, Calendar, Edit } from "lucide-react";

export default async function MyProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl min-h-[70vh]">
      <div className="bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-base-200 p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              {user.image ? (
                <img src={user.image} alt={user.name} referrerPolicy="no-referrer" />
              ) : (
                <div className="bg-primary/20 flex items-center justify-center w-full h-full text-5xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
            <p className="text-xl text-base-content/70">{user.email}</p>
          </div>
          <div>
            <Link href="/my-profile/update" className="btn btn-primary gap-2">
              <Edit className="w-4 h-4" />
              Update Information
            </Link>
          </div>
        </div>

        <div className="divider"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-base-200 p-6 rounded-2xl flex items-center gap-4">
            <User className="w-8 h-8 text-secondary" />
            <div>
              <p className="text-sm text-base-content/70 font-semibold">Full Name</p>
              <p className="text-lg font-medium">{user.name}</p>
            </div>
          </div>
          <div className="bg-base-200 p-6 rounded-2xl flex items-center gap-4">
            <Mail className="w-8 h-8 text-secondary" />
            <div>
              <p className="text-sm text-base-content/70 font-semibold">Email Address</p>
              <p className="text-lg font-medium">{user.email}</p>
            </div>
          </div>
          <div className="bg-base-200 p-6 rounded-2xl flex items-center gap-4">
            <Calendar className="w-8 h-8 text-secondary" />
            <div>
              <p className="text-sm text-base-content/70 font-semibold">Account Created</p>
              <p className="text-lg font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
