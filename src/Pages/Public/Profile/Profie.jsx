import React, { useState, useEffect } from "react";

const PublicProfile = ({ userData, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    avatar: "",
    district: "",
    upazila: "",
    bloodGroup: "",
  });

  // Initialize form with userData
  useEffect(() => {
    if (userData) setForm(userData);
  }, [userData]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save (call onSave prop)
  const handleSave = () => {
    if (onSave) {
      onSave(form);
    }
    setIsEditing(false);
  };

  return (
    <div className="max-w-xl mt-20 mb-30 mx-auto bg-red-600  p-6 rounded-lg shadow-md">
      {/* Edit/Save button */}
      <div className="flex justify-end mb-4">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-primary"
          >
            Edit
          </button>
        ) : (
          <button onClick={handleSave} className="btn btn-success">
            Save
          </button>
        )}
      </div>

      {/* Form */}
      <form>
        {/* Avatar */}
        <div className="mb-6 flex items-center gap-4">
          <img
            src={form.avatar || "https://via.placeholder.com/80"}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover border"
          />
          {isEditing && (
            <input
              type="url"
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              placeholder="Avatar image URL"
              className="input input-bordered w-full max-w-xs"
            />
          )}
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="label">
            <span className="label-text font-semibold">Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            disabled={!isEditing}
          />
        </div>

        {/* Email (always disabled) */}
        <div className="mb-4">
          <label className="label">
            <span className="label-text font-semibold">Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            disabled
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* District */}
        <div className="mb-4">
          <label className="label">
            <span className="label-text font-semibold">District</span>
          </label>
          <input
            type="text"
            name="district"
            value={form.district}
            onChange={handleChange}
            className="input input-bordered w-full"
            disabled={!isEditing}
          />
        </div>

        {/* Upazila */}
        <div className="mb-4">
          <label className="label">
            <span className="label-text font-semibold">Upazila</span>
          </label>
          <input
            type="text"
            name="upazila"
            value={form.upazila}
            onChange={handleChange}
            className="input input-bordered w-full"
            disabled={!isEditing}
          />
        </div>

        {/* Blood Group */}
        <div className="mb-4">
          <label className="label">
            <span className="label-text font-semibold">Blood Group</span>
          </label>
          <select
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
            disabled={!isEditing}
            className="select select-bordered w-full"
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

export default PublicProfile;
