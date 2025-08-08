import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import JoditEditor from "jodit-react";
import axios from "axios";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);
  const axiosSecure = useAxiosSecure();

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [existingThumbnail, setExistingThumbnail] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosSecure.get(`/blogs/${id}`).then((res) => {
      setTitle(res.data.title);
      setExistingThumbnail(res.data.thumbnail);
      setContent(res.data.content);
    });
  }, [id]);

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

      // ✅ SweetAlert success message
      Swal.fire({
        icon: "success",
        title: "Blog Updated",
        text: "The blog has been successfully updated.",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard/admin/content-management");
    } catch {
      // ❌ SweetAlert error message
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating the blog.",
      });
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
