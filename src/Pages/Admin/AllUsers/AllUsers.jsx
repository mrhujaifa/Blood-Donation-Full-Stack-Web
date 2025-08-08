import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUser, FaUserShield } from "react-icons/fa";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { FaHandsHelping } from "react-icons/fa";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 10;

  const { data: users = [], refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      setIsLoading(true);
      const res = await axiosSecure.get("/users");
      setIsLoading(false);
      return res.data;
    },
  });

  const filtered = users.filter((u) =>
    filter === "all" ? true : u.status === filter
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const current = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleToggleBlock = async (userId, currentStatus) => {
    const action = currentStatus === "active" ? "block" : "unblock";
    const confirmResult = await Swal.fire({
      title: `Are you sure to ${action} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${action}`,
    });

    if (!confirmResult.isConfirmed) return;

    try {
      setIsLoading(true);
      const res = await axiosSecure.patch(`/users/status/${userId}`, {
        status: currentStatus === "active" ? "blocked" : "active",
      });
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: `User ${action}ed successfully!`,
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      }
    } catch (error) {
      console.error("Failed to update user status:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update user status. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMakeAdmin = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "donor" : "admin";
    const action =
      currentRole === "admin" ? "remove admin rights from" : "make admin";

    const confirmResult = await Swal.fire({
      title: `Are you sure to ${action} this user?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${action}`,
    });

    if (!confirmResult.isConfirmed) return;

    try {
      setIsLoading(true);
      const res = await axiosSecure.patch(`/users/admin/role/${userId}`, {
        role: newRole,
      });
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: `User role updated to ${newRole}!`,
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      }
    } catch (error) {
      console.error("Failed to update user role:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update user role. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMakeVolunteer = async (userId, currentRole) => {
    const newRole = currentRole === "volunteer" ? "donor" : "volunteer";
    const action =
      currentRole === "volunteer"
        ? "remove volunteer rights from"
        : "make volunteer";

    const confirmResult = await Swal.fire({
      title: `Are you sure to ${action} this user?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${action}`,
    });

    if (!confirmResult.isConfirmed) return;

    try {
      setIsLoading(true);
      const res = await axiosSecure.patch(`/users/volunteer/role/${userId}`, {
        role: newRole,
      });
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: `User role updated to ${newRole}!`,
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      }
    } catch (error) {
      console.error("Failed to update volunteer role:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update volunteer role. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-white/10 text-white border backdrop-blur-sm shadow p-4 sm:p-6 rounded-lg overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">All Users</h2>
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
          className="bg-white text-gray-700 border px-3 py-2 rounded w-full sm:w-auto"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Table for Desktop */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full text-sm text-left border-separate border-spacing-y-2">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Avatar</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {current.map((user, i) => (
              <tr
                key={user._id}
                className="bg-white/10 text-white rounded-md shadow-sm hover:shadow-md transition"
              >
                <td className="px-4 py-3">
                  {(page - 1) * itemsPerPage + i + 1}
                </td>
                <td className="px-4 py-3">
                  <img
                    src={user.profile || "https://i.ibb.co/S4Hc49F9/user-1.png"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  />
                </td>
                <td className="px-4 py-3 font-semibold">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 capitalize">
                  {user.role === "admin" && (
                    <span className="flex items-center gap-1 bg-green-400 w-24 h-6 justify-center rounded-md text-white-400">
                      <FaUserShield size={14} /> Admin
                    </span>
                  )}
                  {user.role === "donor" && (
                    <span className="flex items-center gap-1 bg-blue-400 w-24 h-6 justify-center rounded-md text-white-400">
                      <FaUser size={14} /> Donor
                    </span>
                  )}
                  {user.role === "volunteer" && (
                    <span className=" items-center gap-1 bg-[#df3834] w-24 h-6 flex justify-center rounded-md text-white-400">
                      <FaHandsHelping size={14} />
                      Volunteer
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 font-bold">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {user.status === "active" ? (
                      <button
                        onClick={() => handleToggleBlock(user._id, user.status)}
                        className="bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200 transition text-sm"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() => handleToggleBlock(user._id, user.status)}
                        className="bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200 transition text-sm"
                      >
                        Unblock
                      </button>
                    )}

                    {user.role !== "admin" &&
                      (user.role === "donor" || user.role === "volunteer") && (
                        <button
                          onClick={() =>
                            handleMakeVolunteer(user._id, user.role)
                          }
                          className="bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition text-sm"
                        >
                          {user.role === "donor"
                            ? "Make Volunteer"
                            : "Remove Volunteer"}
                        </button>
                      )}

                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleMakeAdmin(user._id, user.role)}
                        className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-200 transition text-sm"
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user._id, user.role)}
                        className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-200 transition text-sm"
                      >
                        Make Admin
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {current.length > 0 ? (
          current.map((user) => (
            <div
              key={user._id}
              className="bg-white/10 border border-gray-700 rounded-xl p-5 shadow-md text-white flex flex-col space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={user.profile || "https://i.ibb.co/S4Hc49F9/user-1.png"}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white"
                  />
                  <div>
                    <p className="font-semibold text-lg">{user.name}</p>
                    <p className="text-gray-300 text-sm">{user.email}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                    user.status === "active"
                      ? "bg-green-600/80 text-green-100"
                      : "bg-red-600/80 text-red-100"
                  }`}
                >
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-300 mb-2">Role:</p>
                <div className="inline-flex items-center gap-2">
                  {user.role === "admin" && (
                    <span className="flex items-center gap-1 bg-green-400 px-3 py-1 rounded-md text-white">
                      <FaUserShield size={16} /> Admin
                    </span>
                  )}
                  {user.role === "donor" && (
                    <span className="flex items-center gap-1 bg-blue-400 px-3 py-1 rounded-md text-white">
                      <FaUser size={16} /> Donor
                    </span>
                  )}
                  {user.role === "volunteer" && (
                    <span className="flex items-center gap-1 bg-red-500 px-3 py-1 rounded-md text-white">
                      <FaHandsHelping size={16} /> Volunteer
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-start">
                {user.status === "active" ? (
                  <button
                    onClick={() => handleToggleBlock(user._id, user.status)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
                  >
                    Block
                  </button>
                ) : (
                  <button
                    onClick={() => handleToggleBlock(user._id, user.status)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
                  >
                    Unblock
                  </button>
                )}

                {(user.role === "donor" || user.role === "volunteer") &&
                  user.role !== "admin" && (
                    <button
                      onClick={() => handleMakeVolunteer(user._id, user.role)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
                    >
                      {user.role === "donor"
                        ? "Make Volunteer"
                        : "Remove Volunteer"}
                    </button>
                  )}

                {user.role === "admin" ? (
                  <button
                    onClick={() => handleMakeAdmin(user._id, user.role)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
                  >
                    Remove Admin
                  </button>
                ) : (
                  <button
                    onClick={() => handleMakeAdmin(user._id, user.role)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
                  >
                    Make Admin
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-4">No users found.</div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2 flex-wrap">
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`px-4 py-2 rounded-full border transition font-medium ${
              page === num + 1
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
