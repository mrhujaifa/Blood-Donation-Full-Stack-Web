import React from "react";
import FeaturedSection from "../FeaturedSection/FeaturedSection";
import ContactUs from "../ContactUs/ContactUs";
import Banner from "../Banner/Banner";
import Testimonials from "../Testimonials/Testimonials";
import BloodDriveSection from "../BloodDriveSection/BloodDriveSection";
import LifesavingWork from "../LifesavingWork/LifesavingWork";
import SwiperMarquee from "../Marquee/Marquee";

const Home = () => {
  return (
    <div className="">
      <div className="">
        <Banner></Banner>
      </div>

      <div className="">
        <BloodDriveSection></BloodDriveSection>
      </div>
      <div className="">
        <FeaturedSection></FeaturedSection>
      </div>

      <div className=" ">
        <Testimonials></Testimonials>
      </div>
      <div className=" ">
        <LifesavingWork></LifesavingWork>
      </div>
      <div className="">
        <SwiperMarquee></SwiperMarquee>
      </div>
      <div className=" ">
        <ContactUs></ContactUs>
      </div>
    </div>
  );
};

export default Home;
