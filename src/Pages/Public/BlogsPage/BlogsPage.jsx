import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router"; // ✅ Fixed: react-router-dom instead of react-router
import moment from "moment"; // ✅ For date formatting
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import axios from "axios";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
        const published = res.data.filter((b) => b.status === "published");
        setBlogs(published);

        // Extract unique author emails
        const uniqueEmails = [
          ...new Set(published.map((blog) => blog.authorEmail)),
        ];

        // Fetch users based on authorEmail
        const userResponses = await Promise.all(
          uniqueEmails.map((email) =>
            axiosSecure
              .get(`/users?email=${email}`)
              .then((res) => [email, res.data[0]])
              .catch(() => [email, null])
          )
        );

        const userMapData = Object.fromEntries(userResponses);
        setUserMap(userMapData);
      } catch (err) {
        console.error("Error loading blogs or users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading)
    return <div className="text-center py-20 text-lg">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 mt-30">
      <h1 className="text-4xl font-bold text-center mb-12 text-red-600">
        All Published Blogs
      </h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">
          No published blogs available.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => {
            const user = userMap[blog.authorEmail] || {};
            const creatorName =
              blog.creatorName || user.creatorName || "Unknown Author";
            const creatorImage =
              blog.creatorImage ||
              user.creatorImage ||
              "https://i.pravatar.cc/100?img=3";
            const readableDate = moment(blog.createdAt).format("MMMM D, YYYY");

            return (
              <div
                key={blog._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md transition hover:shadow-lg"
              >
                {/* Thumbnail */}
                <img
                  src={
                    blog.thumbnail || "https://i.ibb.co/default-thumbnail.jpg"
                  }
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-5">
                  {/* Category */}
                  <p className="text-sm text-violet-600 font-semibold mb-2">
                    {blog.category || "Blood Donation"}
                  </p>

                  {/* Title + Arrow */}
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
                      {blog.title}
                    </h2>
                    <ArrowUpRight size={18} className="text-gray-500" />
                  </div>

                  {/* Preview Content */}
                  <p
                    className="text-sm text-gray-600 line-clamp-3 mb-4"
                    dangerouslySetInnerHTML={{
                      __html: blog.content.slice(0, 150) + "...",
                    }}
                  />

                  {/* Author Info */}
                  <div className="flex items-center gap-3 mt-5">
                    <img
                      src={creatorImage}
                      alt={creatorName}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {creatorName}
                      </p>
                      <p className="text-xs text-gray-500">{readableDate}</p>
                    </div>
                  </div>

                  {/* Read More */}
                  <Link
                    to={`/blog-details/${blog._id}`}
                    className="inline-block mt-4 text-sm font-semibold text-red-600 hover:underline"
                  >
                    Read full blog
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
