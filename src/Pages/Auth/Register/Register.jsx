import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import axios from "axios";

const Register = () => {
  const { createUser, profileUpdate } = useContext(AuthContext);
  const locationData = useLoaderData();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [upazilas, setUpazilas] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const navigate = useNavigate();

  // useForm hook
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // district select handle
  const selectedDistrict = watch("district");

  useEffect(() => {
    if (selectedDistrict) {
      const found = locationData.find(
        (item) => item.district === selectedDistrict
      );
      setUpazilas(found ? found.covered_area : []);
    } else {
      setUpazilas([]);
    }
  }, [selectedDistrict, locationData]);

  // form submit
  const handleRegister = async (data) => {
    console.log(data);
    const email = data.email;
    const password = data.password;

    const regNewUser = {
      ...data,
      profile: uploadedImageUrl,
      role: "donor",
      status: "active",
    };

    try {
      const result = await createUser(email, password);
      console.log("User registered successfully:", result);

      await profileUpdate(data.name, uploadedImageUrl);
      console.log("Firebase profile updated");

      const res = await axiosSecure.post("/users", regNewUser);
      console.log("User profile added to DB:", res.data);
    } catch (error) {
      console.log(error.message);
    }

    navigate("/");
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_images_upload_key
    }`;

    try {
      const res = await axios.post(imageUploadUrl, formData);
      if (res.data.success) {
        setUploadedImageUrl(res.data.data.url);
        alert("Image uploaded successfully");
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
      console.error(error);
      alert("Image upload error");
    }
  };

  return (
    <div
      className="min-h-screen relative flex justify-end items-center"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/QdrQrQHp/nanobots-are-repairing-damaged-blood-cells-nanotechnology-concept.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative lg:right-40 bg-opacity-90 backdrop-blur-xl rounded-lg mt-20 lg:mt-30 mb-20 shadow-xl border border-base-200 max-w-lg w-full m-3 p-4 lg:p-8">
        <h2 className="text-3xl font-bold text-[#ff1a56] mb-8 text-center">
          Register as Donor
        </h2>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div className="col-span-1">
            <label className="block text-white font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Profile pic */}
          <div className="col-span-1">
            <label className="block text-white font-medium mb-1">
              Profile pic
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* Email */}
          <div className="col-span-1">
            <label className="block text-white font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="example@mail.com"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Blood Group */}
          <div className="col-span-1">
            <label className="block text-white font-medium mb-1">
              Blood Group
            </label>
            <select
              {...register("bloodGroup", {
                required: "Blood group is required",
              })}
              className="select select-bordered w-full"
            >
              <option value="">Select Blood Group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
            {errors.bloodGroup && (
              <p className="text-sm text-red-500">
                {errors.bloodGroup.message}
              </p>
            )}
          </div>

          {/* District */}
          <div className="col-span-1">
            <label className="block text-white font-medium mb-1">
              District
            </label>
            <select
              {...register("district", { required: "District is required" })}
              className="select select-bordered w-full"
            >
              <option value="">Select District</option>
              {locationData.map((d) => (
                <option key={d.district} value={d.district}>
                  {d.district}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-sm text-red-500">{errors.district.message}</p>
            )}
          </div>

          {/* Upazila */}
          <div className="col-span-1">
            <label className="block text-white font-medium mb-1">Upazila</label>
            <select
              {...register("upazila", { required: "Upazila is required" })}
              className="select select-bordered w-full"
            >
              <option value="">Select Upazila</option>
              {upazilas.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
            {errors.upazila && (
              <p className="text-sm text-red-500">{errors.upazila.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="col-span-1 relative">
            <label className="block text-white font-medium mb-1">
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              placeholder="••••••••"
              className="input input-bordered w-full pr-12"
            />
            <button
              type="button"
              className="absolute right-4 top-10 text-gray-500"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="col-span-1 relative">
            <label className="block text-white font-medium mb-1">
              Confirm Password
            </label>
            <input
              type={showConfirmPass ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              placeholder="••••••••"
              className="input input-bordered w-full pr-12"
            />
            <button
              type="button"
              className="absolute right-4 top-10 text-gray-500"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            >
              {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button (Full Width across both cols) */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full px-6 py-3 text-white font-semibold rounded-lg transition duration-300 shadow-md hover:shadow-[0_0_15px_#ff1a56] bg-[#ff1a56] hover:bg-[#e0134c]"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-white">
          Already have an account?{" "}
          <Link
            to="/signIn"
            className="text-[#ff1a56] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
