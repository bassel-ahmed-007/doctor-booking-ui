import React from "react";
import { toast } from "sonner";
import { DoctorTypes } from "../types";

type Props = {
  doctor: DoctorTypes;
  onBook: (doctorDetails: DoctorTypes) => void;
  buttonRef?: (el: HTMLButtonElement | null) => void;
};

const DoctorCard: React.FC<Props> = ({ doctor, onBook, buttonRef }) => {
  return (
    <div
      className="bg-black/35 rounded-2xl shadow-md p-4 flex flex-col items-center text-center gap-2 hover:shadow-lg transition hover:scale-105 hover:bg-black duration-300"
      role="region"
      aria-label={`${doctor.name}`}
    >
      <img
        src={doctor.photo}
        alt={`${doctor.name}'s profile`}
        className="w-24 h-24 rounded-full object-cover"
        loading="lazy"
      />
      <h2 className="text-lg font-semibold text-white">{doctor.name}</h2>
      <p aria-label="Doctor specialty" className="text-sm text-gray-300">
        {doctor.specialty}
      </p>
      <p aria-label="Doctor rating" className="text-sm text-white">
        ⭐ {doctor.rating}
      </p>
      <p className="text-sm text-white">{doctor.location}</p>
      <p
        className={`${
          doctor.availability.length > 0
            ? "text-xs text-green-600"
            : "text-xs text-red-600"
        }`}
      >
        {doctor.availability.length > 0 ? "Available" : "Not Available"}
      </p>
      <button
        ref={buttonRef}
        className="mt-2 bg-main-color text-black px-4 py-2 rounded-xl hover:bg-main-color/60 hover:text-white duration-300 focus:outline-none focus:ring-[4px] focus:ring-white cursor-pointer"
        onClick={() => {
          if (doctor.availability.length > 0) {
            onBook(doctor);
          } else {
            toast.error("Doctor is not available");
          }
        }}
        aria-label={`Book appointment with ${doctor.name}`}
      >
        Book
      </button>
    </div>
  );
};

export default DoctorCard;
