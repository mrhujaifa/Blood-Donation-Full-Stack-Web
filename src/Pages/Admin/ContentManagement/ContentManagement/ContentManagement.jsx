import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

import useRole from "../../../../Hook/useRole";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";
import Swal from "sweetalert2";

const ContentManagement = () => {
  const navigate = useNavigate();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const [isLooading, setIsLoading] = useState(false);

  const [filter, setFilter] = useState("all");

  const fetchBlogs = async () => {
    const res = await axiosSecure.get("/blogs");
    return res.data;
  };

  const {
    data: blogs = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(["blogs"], fetchBlogs);

  const filteredBlogs = blogs.filter((blog) =>
    filter === "all" ? true : blog.status === filter
  );

  const handleStatusToggle = async (id, currentStatus) => {
    if (role !== "admin") return;

    const newStatus = currentStatus === "draft" ? "published" : "draft";

    try {
      setIsLoading(true);
      await axiosSecure.patch(`/blogs/${id}`, { status: newStatus });
      await refetch();

      // SweetAlert2 success message
      Swal.fire({
        icon: "success",
        title: `Blog ${
          newStatus === "published" ? "Published" : "Unpublished"
        }!`,
        text: `The blog has been successfully ${newStatus}.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to update blog status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (role !== "admin") return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this blog deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        setIsLoading(true);
        await axiosSecure.delete(`/blogs/${id}`);
        refetch();
        Swal.fire("Deleted!", "Your blog has been deleted.", "success");
      } catch (error) {
        console.error("Failed to delete blog:", error);
        Swal.fire("Error", "Failed to delete blog. Try again later.", "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/admin/content-management/blogs-edit/${id}`);
  };

  const handleAddBlog = () => {
    navigate("/dashboard/admin/content-management/addblog");
  };

  if (isLooading) return <Loading />;
  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center text-red-600 font-semibold">
        Error loading blogs: {error.message}
      </p>
    );

  // Format date nicely
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between bg-red-700 shadow-lg py-4 px-10 rounded-2xl items-center mb-8">
        <h1 className="text-3xl font-extrabold text-white">
          Content Management
        </h1>
        <button
          onClick={handleAddBlog}
          className="bg-white text-red-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Add Blog
        </button>
      </div>

      <div className="mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border bg-white border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <option value="all">All Blogs</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog) => (
          <article
            key={blog._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="h-52 w-full object-cover rounded-t-xl"
            />
            <div className="p-6 flex flex-col flex-grow">
              <header>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  By{" "}
                  <span className="font-semibold">
                    {blog.author || "Admin"}
                  </span>{" "}
                  on {formatDate(blog.createdAt)}
                </p>
              </header>

              <section className="text-gray-700 mb-6 flex-grow">
                <p
                  className="line-clamp-4"
                  dangerouslySetInnerHTML={{
                    __html:
                      blog.content.length > 200
                        ? blog.content.slice(0, 200) + "..."
                        : blog.content,
                  }}
                />
              </section>

              <footer className="flex justify-between items-center">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    blog.status === "draft"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                </span>

                {role === "admin" && (
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleStatusToggle(blog._id, blog.status)}
                      className={`px-3 py-1 rounded text-white font-semibold transition ${
                        blog.status === "draft"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-yellow-600 hover:bg-yellow-700"
                      }`}
                    >
                      {blog.status === "draft" ? "Publish" : "Unpublish"}
                    </button>
                    <button
                      onClick={() => handleEdit(blog._id)}
                      className="px-3 py-1 rounded bg-yellow-400 hover:bg-yellow-500 text-white font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </footer>
            </div>
          </article>
        ))}

        {filteredBlogs.length === 0 && (
          <p className="col-span-full text-center text-gray-600 font-medium mt-16">
            No blogs found for selected filter.
          </p>
        )}
      </div>
    </div>
  );
};

export default ContentManagement;
