import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import SignIn from "../Pages/Auth/SignIn/SignIn";
import Register from "../Pages/Auth/Register/Register";
import AuthLaout from "../Layouts/AuthLayout/AuthLaout";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import Profile from "../Pages/Users/Profile/Profile";
import CreateDonationRequest from "../Pages/Users/DonationRequest/DonationRequest";
import MyDonationRequest from "../Pages/Users/MyDonationRequest/MyDonationRequest";
import DashboardHome from "../Pages/Users/DashboardHome/DashboardHome";
import PrivateRoute from "./PrivateRoute";
import AdminDashboardHome from "../Pages/Admin/DashboardHome/DashboardHome";
import AdminRoute from "./AdminRoute";
import AllUsers from "../Pages/Admin/AllUsers/AllUsers";
import Forbidden from "../Pages/Error/Forbidden/Forbidden";
import AllBloodDonationRequest from "../Pages/Admin/AllBloodDonationRequest/AllBloodDonationRequest";
import ContentManagement from "../Pages/Admin/ContentManagement/ContentManagement/ContentManagement";
import AddBlog from "../Pages/Admin/ContentManagement/AddBlogs/AddBlogs";
import EditBlog from "../Pages/Admin/ContentManagement/EditBlog/EditBlog";
import VolunteerRoute from "./VolunteerRoute";
import VolunteerDashboardHome from "../Pages/Volunteer/DashboardHome/VolunteerHome";
import AllBloodDonationRequests from "../Pages/Volunteer/AllBloodDonationRequest/AllBloodDonationRequests";
import DonorSearch from "../Pages/Public/SearchDonor/SearchDonors";
import PendingRequests from "../Pages/Public/PendingRequests/PendingRequests";
import DonationRequestDetails from "../Pages/Public/DonationRequestDetails/DonationRequestDetails";
import axios from "axios";
import BlogPage from "../Pages/Public/BlogsPage/BlogsPage";
import BlogDetails from "../Pages/Public/BlogDetails/BlogDetails";
import VolunteerEditBlog from "../Pages/Volunteer/ContentManagement/ContentManagement/BlogEdit";
import VolunteerAddBlog from "../Pages/Volunteer/ContentManagement/AddBlog";
import VolunteerContentManagement from "../Pages/Volunteer/ContentManagement/ContentManagement/volunteerContentManagement";

import Payment from "../Pages/Payment/Payment/Payment";
import FundingPage from "../Pages/Payment/FundingPage/FundingPage";
import PublicProfile from "../Pages/Public/Profile/Profie";
import ContactPage from "../Pages/Public/ContactPage/ContactPage";
import EditDonationRequest from "../Pages/Users/EditDonationRequest/EditDonationRequest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "pending-requests",
        element: <PendingRequests></PendingRequests>,
      },
      {
        path: "donation-request-details/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/donation-request/${params.id}`
          );
          return res.data;
        },
      },
      {
        path: "blogs",
        Component: BlogPage,
      },
      {
        path: "blog-details/:id",
        Component: BlogDetails,
        loader: async ({ params }) => {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/blogs/${params.id}`
          );
          return res.data;
        },
      },
      {
        path: "donate-funding",
        element: (
          <PrivateRoute>
            <FundingPage></FundingPage>
          </PrivateRoute>
        ),
      },

      {
        path: "profile",
        element: <PublicProfile />,
      },
      {
        path: "contact",
        element: <ContactPage></ContactPage>,
      },
      {
        path: "seach-donor",
        Component: DonorSearch,
        loader: () => fetch("/locationData.json"),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLaout />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "register",
        element: <Register />,
        loader: () => fetch("/locationData.json"),
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "donation-request",
        element: <CreateDonationRequest />,
        loader: () => fetch("/locationData.json"),
      },
      // In your router config
      {
        path: "/dashboard/edit-request/:id",
        element: <EditDonationRequest />,
        loader: async ({ params }) => {
          // Fetch donation request by id
          const requestRes = await fetch(
            `${import.meta.env.VITE_API_URL}/donation-request/${params.id}`
          );
          if (!requestRes.ok) {
            throw new Response("Failed to load donation request", {
              status: requestRes.status,
            });
          }
          const donationRequest = await requestRes.json();

          // Fetch districts data (local JSON or API)
          const locationRes = await fetch("/locationData.json");
          if (!locationRes.ok) {
            throw new Response("Failed to load location data", {
              status: locationRes.status,
            });
          }
          const districts = await locationRes.json();

          return { donationRequest, districts };
        },
      },
      {
        path: "my-donation-requests",
        element: <MyDonationRequest />,
      },

      // Admin dashboard routes
      {
        path: "admin/home",
        element: (
          <AdminRoute>
            <AdminDashboardHome />
          </AdminRoute>
        ),
      },
      {
        path: "admin/all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "admin/all-blood-donation-request",
        element: (
          <AdminRoute>
            <AllBloodDonationRequest />
          </AdminRoute>
        ),
      },
      {
        path: "admin/content-management",
        element: (
          <AdminRoute>
            <ContentManagement />
          </AdminRoute>
        ),
      },
      {
        path: "admin/content-management/addblog",
        element: (
          <AdminRoute>
            <AddBlog />
          </AdminRoute>
        ),
      },
      {
        path: "admin/content-management/blogs-edit/:id",
        element: (
          <AdminRoute>
            <EditBlog />
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/blogs/${params.id}`),
        errorElement: (
          <p className="text-red-600 text-center mt-10">Blog not found.</p>
        ),
      },
      {
        path: "volunteer/home",
        element: (
          <VolunteerRoute>
            <VolunteerDashboardHome></VolunteerDashboardHome>
          </VolunteerRoute>
        ),
      },
      {
        path: "volunteer/all-blood-donation-request",
        element: (
          <VolunteerRoute>
            <AllBloodDonationRequests></AllBloodDonationRequests>
          </VolunteerRoute>
        ),
      },
      {
        path: "volunteer/content-management",
        element: (
          <VolunteerRoute>
            <VolunteerContentManagement></VolunteerContentManagement>
          </VolunteerRoute>
        ),
      },
      {
        path: "volunteer/content-management/add-blog",
        element: (
          <VolunteerRoute>
            <VolunteerAddBlog></VolunteerAddBlog>
          </VolunteerRoute>
        ),
      },
      {
        path: "volunteer/content-management/blogs-edit/:id",
        element: (
          <VolunteerRoute>
            <VolunteerEditBlog></VolunteerEditBlog>
          </VolunteerRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/blogs/${params.id}`),
        errorElement: (
          <p className="text-red-600 text-center mt-10">Blog not found.</p>
        ),
      },
    ],
  },
  {
    path: "/forbidden",
    element: (
      <PrivateRoute>
        <Forbidden />
      </PrivateRoute>
    ),
  },
]);
