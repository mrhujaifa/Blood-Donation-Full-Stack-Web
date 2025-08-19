import React from "react";

const Testimonials = () => {
  return (
    <section className="bg-red-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Section: Headline and Description */}
        <div>
          <h4 className="text-red-600 text-sm lg:text-4xl font-semibold  tracking-wider mb-2">
            Testimonials
          </h4>
          <h2 className="text-5xl font-semibold text-gray-900 leading-tight mb-6">
            Lives Changed: Testimonials from Donors & Survivors
          </h2>
          <p
            data-aos="fade-up"
            data-aos-duration="1000"
            className="text-lg text-gray-600 mb-8"
          >
            Real experiences from real people. Discover how one small act of
            kindness—donating blood—can mean everything to someone in need.
            These stories reflect the deep human connection and life-saving
            impact a donor can have.
          </p>

          {/* Featured Testimonial (Red Box) */}
          <div className="bg-red-700 p-8 rounded-lg shadow-lg">
            <h5 className="text-white text-xl font-semibold mb-4">
              "A Gift of Life When I Needed It Most"
            </h5>
            <p className="text-red-100 text-base leading-relaxed mb-6">
              After an unexpected medical emergency, I found myself in urgent
              need of a blood transfusion. Without the generosity of a stranger
              who donated, I wouldn’t be here today. That moment changed my life
              forever, and I now advocate for more people to become regular
              donors.
            </p>
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              className="flex items-center"
            >
              <img
                className="h-12 w-12 rounded-full object-cover mr-4"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Rebecca Sovine"
              />
              <div>
                <p className="text-white font-semibold">Rebecca Sovine</p>
                <p className="text-red-200 text-sm">Blood Recipient</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Donor Testimonial */}
        <div className="bg-white rounded-xl shadow-md h-full flex flex-col justify-between p-8">
          <div data-aos="fade-up"
            data-aos-duration="1000" className="flex items-center gap-4 mb-4">
            <img
              src="https://img.freepik.com/free-photo/smiling-young-male-professional-standing-with-arms-crossed-while-making-eye-contact-against-isolated-background_662251-838.jpg?semt=ais_hybrid&w=740"
              alt="Edward Collin"
              className="w-14 h-14 object-cover rounded-full border"
            />
            <div>
              <p className="font-semibold text-gray-800">Mr. Hujaifa</p>
              <p className="text-sm text-red-600">Regular Blood Donor</p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-2">
            <img
              src="https://i.postimg.cc/RF88mzHG/pexels-photo-12193105.jpg"
              alt="Donation"
              className="rounded-md w-full  h-48 md:h-65"
            />
            <div className="mt-4">
              <h4 className="text-lg font-semibold">
                "A Simple Act, A Life Saved"
              </h4>
              <p className="text-sm text-gray-600 mt-2">
                I began donating blood during my university years and never
                stopped. It’s a simple act that takes just a few minutes, yet it
                holds the power to save lives. I encourage everyone to consider
                being part of this life-saving mission.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
