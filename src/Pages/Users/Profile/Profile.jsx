import React, { useState, useEffect } from "react";

const Profile = ({ userData, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    avatar: "",
    district: "",
    upazila: "",
    bloodGroup: "",
  });

  useEffect(() => {
    if (userData) setForm(userData);
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(form);
    }
    setIsEditing(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      {/* Header with Edit/Save button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">My Profile</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition"
          >
            Save
          </button>
        )}
      </div>

      {/* Form */}
      <form className="space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <img
            src={form.avatar || "https://via.placeholder.com/96"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow-sm"
          />
          {isEditing && (
            <input
              type="url"
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              placeholder="Avatar Image URL"
              className="input input-bordered w-full max-w-xs focus:ring-2 focus:ring-blue-400"
            />
          )}
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Your full name"
            className={`w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
              !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
        </div>

        {/* Email (always disabled) */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            disabled
            className="w-full rounded-md border border-gray-300 px-4 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>

        {/* District */}
        <div>
          <label
            htmlFor="district"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            District
          </label>
          <input
            id="district"
            type="text"
            name="district"
            value={form.district}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Enter your district"
            className={`w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
              !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
        </div>

        {/* Upazila */}
        <div>
          <label
            htmlFor="upazila"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Upazila
          </label>
          <input
            id="upazila"
            type="text"
            name="upazila"
            value={form.upazila}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Enter your upazila"
            className={`w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
              !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
        </div>

        {/* Blood Group */}
        <div>
          <label
            htmlFor="bloodGroup"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Blood Group
          </label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
              !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Profile;
