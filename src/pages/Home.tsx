import { useState } from "react";
import FilterBar from "../components/FilterBar";
import { DoctorTypes } from "../types";
import DoctorsGrid from "../components/home/DoctorsGrid";
import AppointmentsListModal from "../components/AppointmentsListModal";
import BookingModal from "../components/BookingModal/BookingModal";

const Home = () => {
  const [selecteddoctorDetails, setSelecteddoctorDetails] =
    useState<DoctorTypes | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [showAppointmentsList, setShowAppointmentList] = useState(false);

  return (
    <div className="mainContainer py-[60px] min-h-screen p-4 font-poppins ">
      <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-center text-white">
        Welcome to the Doctor Booking System
      </h1>

      <div className="my-8 flex flex-col md:flex-row items-center justify-between">
        <FilterBar
          selectedSpecialty={selectedSpecialty}
          onSpecialtyChange={setSelectedSpecialty}
          onlyAvailable={onlyAvailable}
          onAvailabilityToggle={() => setOnlyAvailable((prev) => !prev)}
        />

        <div className="w-[90%] md:min-w-[200px] md:w-[30%]">
          <button
            type="button"
            onClick={() => setShowAppointmentList(true)}
            aria-label="my-appointments"
            className="w-full mt-2 bg-main-color text-black px-4 py-2 rounded-xl hover:bg-main-color/60 hover:text-white duration-300 focus:outline-none focus:ring-[4px] focus:ring-white cursor-pointer"
          >
            My Appointments
          </button>
        </div>
      </div>

      {/* doctors cards ====================================*/}
      <DoctorsGrid
        onlyAvailable={onlyAvailable}
        selectedSpecialty={selectedSpecialty}
        setSelecteddoctorDetails={setSelecteddoctorDetails}
      />

      {selecteddoctorDetails && (
        <BookingModal
          doctorDetails={selecteddoctorDetails}
          onClose={() => setSelecteddoctorDetails(null)}
        />
      )}

      {showAppointmentsList && (
        <AppointmentsListModal onClose={() => setShowAppointmentList(false)} />
      )}
    </div>
  );
};

export default Home;
