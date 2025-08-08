import React from "react";
import BloodDonation from "../../assets/blood-donation.png";
import "./BloodDonationLogo.css";

const BloodDonationLogo = () => {
  return (
    <div>
      <div className="flex items-center ">
        <img src={BloodDonation} className="max-w-10" alt="" />
        <div className=" ">
          <span className="text-[#ff1a56] font-extrabold text-xl logo-font">
            Blood
          </span>
          <span className="text-[#ff1a56] font-extrabold text-xl logo-font">
            Donation
          </span>
        </div>
      </div>
    </div>
  );
};

export default BloodDonationLogo;
