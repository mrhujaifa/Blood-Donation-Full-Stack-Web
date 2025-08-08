import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import useAxiosSecure from "../../../Hook/useAxiosSecure";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error("Failed to fetch blog details", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!blog)
    return <div className="text-center py-10 text-red-600">Blog not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 mt-30">
      <img
        src={blog.thumbnail}
        alt={blog.title}
        className="w-full h-60 object-cover rounded-xl mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
      <div
        className="text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default BlogDetails;
