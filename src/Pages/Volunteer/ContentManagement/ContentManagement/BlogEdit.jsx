import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import JoditEditor from "jodit-react";
import axios from "axios";
import useAuth from "../../../../Hook/useAuth";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

export default function VolunteerEditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [existingThumbnail, setExistingThumbnail] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch blog data
  useEffect(() => {
    axiosSecure.get(`/blogs/${id}`).then((res) => {
      const blogData = res.data;

      setTitle(blogData.title);
      setExistingThumbnail(blogData.thumbnail);
      setContent(blogData.content);
    });
  }, [id, user]);

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
    setLoading(true);
    try {
      let imageUrl = existingThumbnail;
      if (thumbnail) {
        imageUrl = await handleImageUpload(thumbnail);
      }
      await axiosSecure.put(`/blogs/${id}`, {
        title,
        thumbnail: imageUrl,
        content,
      });
      alert("Blog updated!");
      navigate("/dashboard/volunteer/content-management");
    } catch {
      alert("Error updating blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded shadow space-y-4"
    >
      <h2 className="text-2xl font-bold">Edit Blog</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <div>
        <img src={existingThumbnail} alt="Thumbnail" className="w-48 mb-2" />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
        />
      </div>
      <JoditEditor ref={editor} value={content} onChange={setContent} />
      <button
        disabled={loading}
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Updating..." : "Update Blog"}
      </button>
    </form>
  );
}
