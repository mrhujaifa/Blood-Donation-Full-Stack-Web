import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const logoUrls = [
  "https://www.shutterstock.com/image-vector/logo-united-nations-international-childrens-260nw-2323074925.jpg",
  "https://i.podnews.network/dir/co/1/281.png",
  "https://www.shutterstock.com/image-vector/demo-text-logo-design-icon-600nw-1765746851.jpg",
  "https://img.freepik.com/free-vector/gradient-one-fire-logo-gaming-template_17005-1888.jpg?semt=ais_hybrid&w=740",
  "https://png.pngtree.com/png-vector/20230222/ourmid/pngtree-modern-demo-logo-vector-file-png-image_6614023.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWFVSVLuMm7HjxV-u-FHXM63nSV0me64VUJw&s",
];

const SwiperMarquee = () => {
  return (
    <div className="logo-font container mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 py-10  ">
      <div className=" mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-700">
          Our Proud Partners
        </h2>
       
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={4000}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        className="w-full mt-10"
      >
        {logoUrls.concat(logoUrls).map((url, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center hover:scale-110 transition-transform duration-300">
              <img
                src={url}
                alt={`Partner ${index + 1}`}
                className="h-30 sm:h-12 object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperMarquee;
