// src/pages/AddBlog.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import JoditEditor from "jodit-react";
import axios from "axios";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const VolunteerAddBlog = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure()

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [userProfile, setUserProfile] = useState(null);

  // 🔄 Fetch current user's profile data
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users?email=${user.email}`)
        .then((res) => {
          setUserProfile(res.data);
        })
        .catch((err) => {
          console.error("User fetch error", err);
        });
    }
  }, [user]);

  const handleImageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_images_upload_key
      }`,
      formData
    );
    return res.data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !thumbnail || !content) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const imageUrl = await handleImageUpload(thumbnail);

      const blogData = {
        title,
        thumbnail: imageUrl,
        content,
        createdAt: new Date().toISOString(),
        status: "draft",
        CreateBy: "volunteer",
        creatorName: user?.displayName,
        creatorImage: user?.photoURL,
      };

      await axiosSecure.post("/blogs", blogData);
      alert("Blog created successfully!");
      navigate("/dashboard/volunteer/content-management");
    } catch (err) {
      console.error("Error creating blog:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !userProfile) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-6 bg-white p-6 shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add New Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Blog Title</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Blog Content</label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VolunteerAddBlog;
