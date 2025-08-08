// src/Pages/Error/Forbidden.jsx
import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-red-100 via-white to-red-50 p-6">
      <div className="max-w-md text-center bg-white shadow-2xl rounded-3xl p-10 border border-red-200">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 text-red-600 rounded-full p-4">
            <FaLock className="text-4xl" />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Access Denied
        </h2>
        <p className="text-gray-600 mb-6">
          You don’t have permission to access this page.
          <br />
          This route is restricted to administrators only.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
