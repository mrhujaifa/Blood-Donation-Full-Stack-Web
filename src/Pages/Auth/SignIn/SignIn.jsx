import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";

const SignIn = () => {
  const { signIn } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  // Custom Firebase Error Handler
  const handleFirebaseError = (code) => {
    switch (code) {
      case "auth/user-not-found":
        return "No user found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/invalid-email":
        return "Invalid email format.";
      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";
      case "auth/network-request-failed":
        return "Network error. Please check your internet connection.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const handleSignUp = (data) => {
    const email = data.email;
    const password = data.password;

    signIn(email, password)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome back, ${res.user.displayName || "Donor"}!`,
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((err) => {
        const message = handleFirebaseError(err.code);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: message,
        });
      });
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

      <div className="relative lg:right-40 bg-opacity-90 backdrop-blur-xl rounded-lg shadow-xl border border-base-200 max-w-lg w-full m-8 p-8">
        <h2 className="text-3xl font-bold text-[#ff1a56] mb-8 text-center">
          Sign In as Donor
        </h2>

        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-5">
          <div>
            <label className="block text-white font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="example@mail.com"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-white font-medium mb-1">Password</label>
            <input
              type={showPass ? "text" : "password"}
              {...register("password", { required: true, minLength: 6 })}
              placeholder="••••••••"
              className="input input-bordered w-full pr-12"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-10 text-gray-500"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 text-white font-semibold rounded-lg transition duration-300 shadow-md hover:shadow-[0_0_15px_#ff1a56] bg-[#ff1a56] hover:bg-[#e0134c]"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-white">
          No Any Account?{" "}
          <Link
            to="/register"
            className="text-[#ff1a56] font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
