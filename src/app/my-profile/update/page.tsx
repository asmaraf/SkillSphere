"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

export default function UpdateProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name);
      setImage(session.user.image || "");
    }
  }, [session]);

  if (isPending) {
    return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { data, error } = await authClient.updateUser({
      name,
      image,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Failed to update profile");
    } else {
      toast.success("Profile updated successfully!");
      router.push("/my-profile");
      router.refresh();
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-xl min-h-[70vh]">
      <Link href="/my-profile" className="btn btn-ghost mb-6">← Back to Profile</Link>
      
      <div className="card bg-base-100 shadow-2xl border border-base-200">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-primary mb-6">Update Information</h2>
          <form onSubmit={handleUpdate}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold">Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text font-semibold">Image URL</span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <span className="loading loading-spinner"></span> : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
