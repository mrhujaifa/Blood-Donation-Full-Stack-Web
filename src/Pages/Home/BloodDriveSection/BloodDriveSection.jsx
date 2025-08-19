import React from "react";
import CountUp from "react-countup";
import { FaHeart, FaPhoneAlt } from "react-icons/fa";

const BloodDriveSection = () => {
  return (
    <section className="container mx-auto px-4 py-14">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left Side */}
        <div className="flex flex-col justify-between rounded-xl p-4 sm:p-6 lg:p-8 shadow-sm">
          {/* Count Cards */}
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8 text-center"
          >
            {[
              { end: 75, label: "Blood Cooperations" },
              { end: 90, label: "Expert Staff" },
              { end: 320, label: "Blood Donations" },
            ].map((item, idx) => (
              <div key={idx}>
                <h2 className="text-3xl sm:text-4xl font-bold text-red-700">
                  <CountUp end={item.end} duration={2} />+
                </h2>
                <p className="text-sm  -800 mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Text + Stacked Images */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Text Box */}
            <div className="flex-1 bg-red-700 text-white rounded-xl p-5 sm:p-6 flex flex-col justify-center shadow-md">
              <h1 className="text-xl sm:text-2xl font-bold mb-3">
                Why We Do It
              </h1>
              <p className="text-sm sm:text-base leading-relaxed">
                Every 2 seconds, someone needs a blood transfusion. Yet, less
                than 5% of eligible donors give blood. We’re here to bridge that
                gap, making donation simple, safe, and rewarding.
              </p>
            </div>

            {/* Stacked Images */}
            <div className="flex flex-1 flex-col gap-4">
              <img
                src="https://st2.depositphotos.com/2977159/7409/i/950/depositphotos_74091937-stock-photo-blood-bag-in-a-blood.jpg"
                alt="blood bag"
                className="w-full h-40 sm:h-44 md:h-1/2 object-cover rounded-xl shadow"
              />
              <img
                src="https://www.matherhospital.org/wp-content/uploads/2024/06/AdobeStock_567403348-scaled.jpg"
                alt="blood donation"
                className="w-full h-40 sm:h-44 md:h-1/2 object-cover rounded-xl shadow"
              />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-red-600 font-semibold mb-2">Our Story</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-snug">
              Dedicated to Life, The Story of Our Blood Drive Initiative
            </h2>
            <p className=" -700 mb-6 text-sm sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fringilla
              curabitur adipiscing pulvinar nisi natoque odio cursus.
              Consectetur lacus ridiculus sagittis nisi non euismod molestie.
            </p>

            {/* Boxed Help */}
            <div className=" rounded-xl p-5 mb-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-2">Have a Question?</h4>
              <p className="text-sm  -600 mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-red-600 text-white p-3 rounded-full">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-sm font-medium">Call Us</p>
                  <p className="font-bold">+98 765 43210</p>
                </div>
              </div>
            </div>

            {/* Bullet Points */}
            <ul className="space-y-3  -700 mb-6 text-sm sm:text-base">
              {[
                "Torquent sem ligula ultrices odio.",
                "Integer aliquet enim conubia.",
                "Massa eleifend dapibus litora.",
                "Aptent morbi duis pharetra vel.",
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <FaHeart className="text-red-600 mt-1" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <button className="bg-red-600 text-white px-6 py-3 rounded-md shadow hover:bg-red-700 transition-all self-start">
            Discover More
          </button>
        </div>
      </div>
    </section>
  );
};

export default BloodDriveSection;
