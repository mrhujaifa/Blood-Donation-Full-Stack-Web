import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

const tabs = [
  { id: "donation", label: "Blood Donation" },
  { id: "bank", label: "Blood Bank" },
  { id: "health", label: "Health Check" },
];

// Content for each tab
const tabContent = {
  donation: {
    title: "Blood Donation",
    description:
      "Donating blood is a simple and powerful act that can save lives. Whether it’s for accident victims, surgical patients, or individuals with blood disorders, your donation plays a vital role in emergency care and long-term treatments.",
    bullets: [
      "Helps patients with severe injuries or surgeries.",
      "Supports individuals with chronic illnesses like thalassemia.",
      "Promotes a sense of community and compassion.",
      "Safe, quick, and medically supervised process.",
    ],
    image:
      "https://media.istockphoto.com/id/1307735237/photo/young-male-donor-donating-blood.jpg?s=612x612&w=0&k=20&c=ZemA7-MQ2c9ty5ZKGmTM_vEUGdgZrrGFQS3smtX4rEQ=", // replace if needed
  },
  bank: {
    title: "Blood Bank",
    description:
      "Blood banks are essential healthcare facilities that store and preserve blood components. They ensure an uninterrupted supply of safe blood for patients in need — from trauma cases to cancer treatments.",
    bullets: [
      "Storage of various blood types.",
      "Advanced freezing and separation facilities.",
      "Immediate supply during crisis.",
      "Managed by trained healthcare professionals.",
    ],
    image:
      "https://www.boekelsci.com/media/wysiwyg/01-what-is-the-most-important-equipment-for-blood-banking.jpg", // replace if needed
  },
  health: {
    title: "Health Check",
    description:
      "Regular health checkups are critical for early detection of diseases and maintaining overall well-being. They empower individuals to take control of their health through prevention and timely medical advice.",
    bullets: [
      "Blood pressure and sugar checkups.",
      "Cholesterol and BMI monitoring.",
      "Vaccination and screenings.",
      "Consultations and follow-ups.",
    ],
    image:
      "https://www.swaconhospital.com/wp-content/uploads/2019/09/34-5-reasons-why-you-need-a-regular-checkup-feat-1080x600.jpg",
  },
};

const LifesavingWork = () => {
  const [activeTab, setActiveTab] = useState("donation");

  const content = tabContent[activeTab];

  return (
    <section className="py-12  container mx-auto">
      <p className="text-red-600 font-semibold lg:text-4xl mb-2">What We Do</p>
      <h1
        data-aos="fade-up"
        data-aos-duration="1000"
        className="text-4xl font-bold leading-tight mb-4"
      >
        The Lifesaving Work We Do for Communities in Need
      </h1>
      <p className="   -600 max-w-2xl mb-6">
        Our mission is to provide lifesaving care and support through blood
        donations, modern blood banking, and essential health screenings. With
        your help, we bring hope and healing to individuals and families when
        they need it most.
      </p>

      <div className="flex gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-6 py-3 rounded ${
              activeTab === tab.id
                ? "bg-red-700 text-white"
                : "bg-gray-100 text-red-700 hover:bg-gray-200"
            } font-semibold transition`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        data-aos="fade-up"
        data-aos-duration="1400"
        className=" shadow-md p-6 rounded-lg"
      >
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4">{content.title}</h2>
            <p className="   -600 mb-4">{content.description}</p>
            <ul className="   -700 space-y-2 mb-4">
              {content.bullets.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <FaChevronRight className="text-red-600 mt-1" /> {item}
                </li>
              ))}
            </ul>
            <button className="text-red-600 font-medium hover:underline flex items-center">
              Learn More <FaChevronRight className="ml-1" size={14} />
            </button>
          </div>
          <div className="flex-1">
            <img
              src={content.image}
              alt={content.title}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifesavingWork;
