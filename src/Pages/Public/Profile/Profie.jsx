import React, { useState, useEffect } from "react";
import { FaEdit, FaSave, FaUpload } from "react-icons/fa";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import axios from "axios";

const PublicProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    name: "",
    avatar: "",
    district: "",
    upazila: "",
    bloodGroup: "",
  });

  // Fetch logged-in user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosSecure.get("/users");
        const foundUser = res.data.find((u) => u.email === user.email);
        if (foundUser) {
          setLoggedInUser(foundUser);
          setForm({
            name: foundUser.name,
            avatar: foundUser.profile,
            district: foundUser.district,
            upazila: foundUser.upazila,
            bloodGroup: foundUser.bloodGroup,
          });
          setPreview(foundUser.profile);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload to imgbb
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_images_upload_key}`,
        formData
      );
      setForm((prev) => ({ ...prev, avatar: res.data.data.url }));
      setPreview(res.data.data.url);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  // Save updated profile
  const handleSave = async () => {
    if (!loggedInUser) return;1
    setLoading(true);
    try {
      const updatedData = {
        name: form.name,
        profile: form.avatar,
        district: form.district,
        upazila: form.upazila,
        bloodGroup: form.bloodGroup,
      };

      const res = await axiosSecure.patch(`/users/${loggedInUser._id}`, updatedData);
      setLoggedInUser(res.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!loggedInUser) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 rounded-2xl border border-white/10 shadow-2xl bg-white/10 backdrop-blur-xl text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md transition"
          >
            <FaEdit /> Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-green-600/80 hover:bg-green-700 text-white rounded-xl shadow-md transition disabled:opacity-50"
          >
            {loading ? "Saving..." : <><FaSave /> Save</>}
          </button>
        )}
      </div>

      {/* Avatar + Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
        <div className="relative group">
          <img
            src={preview || "https://i.ibb.co/wZ2Xb7tf/book.png"}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-300/40 shadow-lg"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white shadow-md cursor-pointer hover:bg-blue-700 transition">
              <FaUpload size={14} />
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          )}
        </div>
        <div className="space-y-3 w-full">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Your Name"
            className={`text-2xl font-semibold w-full border-b px-2 py-1 focus:outline-none focus:border-blue-400 ${
              !isEditing ? "bg-transparent border-transparent" : "bg-white/10 backdrop-blur-md"
            } text-white`}
          />
          <input
            type="email"
            value={loggedInUser.email}
            disabled
            className="text-white/70 w-full border-b px-2 py-1 bg-white/10 backdrop-blur-md cursor-not-allowed"
          />
        </div>
      </div>

      {/* More Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {["district", "upazila"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-white/80 mb-1 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder={`Enter your ${field}`}
              className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-400 ${
                !isEditing ? "bg-white/10 backdrop-blur-md cursor-not-allowed" : "bg-white/20 backdrop-blur-md"
              } text-white`}
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Blood Group</label>
          <select
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-400 ${
              !isEditing ? "bg-white/10 backdrop-blur-md cursor-not-allowed" : "bg-white/20 backdrop-blur-md"
            } text-white`}
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
