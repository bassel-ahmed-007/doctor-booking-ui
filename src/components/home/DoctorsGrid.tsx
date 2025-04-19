import DoctorCard from "../DoctorCard";
import { doctors } from "../../mock/doctors";
import { DoctorTypes } from "../../types";

type props = {
  selectedSpecialty: string;
  onlyAvailable: boolean;
  setSelecteddoctorDetails: (doctorDetails: DoctorTypes) => void;
};

const DoctorsGrid = ({
  selectedSpecialty,
  onlyAvailable,
  setSelecteddoctorDetails,
}: props) => {
  const filteredDoctors = doctors?.filter((doc) => {
    const matchesSpecialty =
      selectedSpecialty === "All" || doc.specialty === selectedSpecialty;
    const matchesAvailability = !onlyAvailable || doc.availability.length > 0;
    return matchesSpecialty && matchesAvailability;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredDoctors.map((doc) => (
        <DoctorCard
          key={doc.id}
          doctor={doc}
          onBook={setSelecteddoctorDetails}
        />
      ))}
    </div>
  );
};

export default DoctorsGrid;
