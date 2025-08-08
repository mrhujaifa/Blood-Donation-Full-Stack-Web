import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useUserStatus from "../../../Hook/useUserStatus";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const EditDonationRequest = () => {
  const { donationRequest, districts } = useLoaderData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { status, statusLoading } = useUserStatus();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: donationRequest,
  });

  const recipientDistrict = watch("recipientDistrict");
  const [upazilas, setUpazilas] = useState([]);

  // Reset form when donationRequest changes
  useEffect(() => {
    reset(donationRequest);
  }, [donationRequest, reset]);

  // Update upazilas when recipientDistrict changes
  useEffect(() => {
    const foundDistrict = districts.find((d) => d.district === recipientDistrict);
    setUpazilas(foundDistrict ? foundDistrict.covered_area : []);
    reset((formValues) => ({ ...formValues, recipientUpazila: "" }));
  }, [recipientDistrict, districts, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.patch(
        `/donation-request/${donationRequest._id}`,
        data
      );

      
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Donation request updated successfully!",
          confirmButtonColor: "#d33",
        }).then(() => navigate("/dashboard"));
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong! Status: " + res.status,
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to update donation request.",
        confirmButtonColor: "#d33",
      });
    }

    console.log(data)
  };

  if (statusLoading) return <Loading />;

  if (status === "blocked") {
    return (
      <div className="text-center text-red-500 text-lg mt-10">
        You have been <strong>blocked</strong> by an admin and cannot edit donation requests.
        <br />
        Please contact support if you believe this is a mistake.
      </div>
    );
  }

  if (status !== "active") {
    return (
      <div className="text-center text-yellow-500 text-lg mt-10">
        You are not allowed to edit a donation request.
        <br />
        Your account status is <strong>{status}</strong>. Only <strong>active</strong> users can proceed.
      </div>
    );
  }

  const inputClass =
    "w-full bg-white/10 backdrop-blur-sm text-white placeholder:text-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md px-4 py-2";

  const selectClass = inputClass + " appearance-none";

  const textareaClass =
    "w-full bg-white/10 backdrop-blur-sm text-white placeholder:text-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md px-4 py-2 resize-none";

  return (
    <div className="max-w-6xl mx-auto px-4 w-full mb-20">
      <div className="bg-white/5 text-white border border-white/20 backdrop-blur-md rounded-lg p-4 sm:p-6 shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
          Edit Donation Request
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Requester Name */}
          <div className="col-span-1 md:col-span-2">
            <label className="font-medium mb-1 block">Requester Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full bg-gray-700 text-white cursor-not-allowed rounded-md px-4 py-2 border border-gray-600"
            />
          </div>

          {/* Requester Email */}
          <div className="col-span-1 md:col-span-2">
            <label className="font-medium mb-1 block">Requester Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full bg-gray-700 text-white cursor-not-allowed rounded-md px-4 py-2 border border-gray-600"
            />
          </div>

          {/* Recipient Name */}
          <div>
            <label className="font-medium mb-1 block">Recipient Name</label>
            <input
              {...register("recipientName", { required: true })}
              type="text"
              placeholder="Enter recipient name"
              className={inputClass}
            />
            {errors.recipientName && (
              <p className="text-red-500 text-sm mt-1">This field is required</p>
            )}
          </div>

          {/* Recipient District */}
          <div>
            <label className="font-medium mb-1 block">Recipient District</label>
            <select
              {...register("recipientDistrict", { required: true })}
              className={selectClass}
            >
              <option className="text-black" value="">
                Select District
              </option>
              {districts.map((d) => (
                <option className="text-black" key={d.district} value={d.district}>
                  {d.district}
                </option>
              ))}
            </select>
            {errors.recipientDistrict && (
              <p className="text-red-500 text-sm mt-1">Please select a district</p>
            )}
          </div>

          {/* Recipient Upazila */}
          <div>
            <label className="font-medium mb-1 block">Recipient Upazila</label>
            <select
              {...register("recipientUpazila", { required: true })}
              className={selectClass}
              disabled={!upazilas.length}
            >
              <option className="text-black" value="">
                Select Upazila
              </option>
              {upazilas.map((u) => (
                <option className="text-black" key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
            {errors.recipientUpazila && (
              <p className="text-red-500 text-sm mt-1">Please select an upazila</p>
            )}
          </div>

          {/* Hospital Name */}
          <div>
            <label className="font-medium mb-1 block">Hospital Name</label>
            <input
              {...register("hospitalName", { required: true })}
              type="text"
              placeholder="e.g. Dhaka Medical College"
              className={inputClass}
            />
            {errors.hospitalName && (
              <p className="text-red-500 text-sm mt-1">Hospital name is required</p>
            )}
          </div>

          {/* Full Address */}
          <div className="md:col-span-2">
            <label className="font-medium mb-1 block">Full Address</label>
            <input
              {...register("fullAddress", { required: true })}
              type="text"
              placeholder="e.g. Zahir Raihan Rd, Dhaka"
              className={inputClass}
            />
            {errors.fullAddress && (
              <p className="text-red-500 text-sm mt-1">Full address is required</p>
            )}
          </div>

          {/* Blood Group */}
          <div>
            <label className="font-medium mb-1 block">Blood Group</label>
            <select
              {...register("bloodGroup", { required: true })}
              className={selectClass}
            >
              <option className="text-black" value="">
                Select Blood Group
              </option>
              {bloodGroups.map((bg) => (
                <option className="text-black" key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
            {errors.bloodGroup && (
              <p className="text-red-500 text-sm mt-1">Please select a blood group</p>
            )}
          </div>

          {/* Donation Date */}
          <div>
            <label className="font-medium mb-1 block">Donation Date</label>
            <input
              {...register("donationDate", { required: true })}
              type="date"
              className={inputClass}
            />
            {errors.donationDate && (
              <p className="text-red-500 text-sm mt-1">Date is required</p>
            )}
          </div>

          {/* Donation Time */}
          <div>
            <label className="font-medium mb-1 block">Donation Time</label>
            <input
              {...register("donationTime", { required: true })}
              type="time"
              className={inputClass}
            />
            {errors.donationTime && (
              <p className="text-red-500 text-sm mt-1">Time is required</p>
            )}
          </div>

          {/* Request Message */}
          <div className="md:col-span-2">
            <label className="font-medium mb-1 block">Request Message</label>
            <textarea
              {...register("requestMessage", { required: true })}
              rows={4}
              placeholder="Write the reason why you need blood"
              className={textareaClass}
            />
            {errors.requestMessage && (
              <p className="text-red-500 text-sm mt-1">Request message is required</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-end mt-4">
            <button
              type="submit"
              className="px-6 py-2 w-full rounded bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold shadow-md transition-all duration-300"
            >
              Update Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDonationRequest;
