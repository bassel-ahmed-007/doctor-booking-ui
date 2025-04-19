import { useEffect, useRef } from "react";
import DoctorCard from "../DoctorCard";
import { doctors } from "../../mock/doctors";
import { DoctorTypes } from "../../types";

type Props = {
  selectedSpecialty: string;
  onlyAvailable: boolean;
  setSelecteddoctorDetails: (doctorDetails: DoctorTypes) => void;
};

const DoctorsGrid = ({
  selectedSpecialty,
  onlyAvailable,
  setSelecteddoctorDetails,
}: Props) => {
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const filteredDoctors = doctors?.filter((doc) => {
    const matchesSpecialty =
      selectedSpecialty === "All" || doc.specialty === selectedSpecialty;
    const matchesAvailability = !onlyAvailable || doc.availability.length > 0;
    return matchesSpecialty && matchesAvailability;
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeIndex = cardRefs.current.findIndex(
        (ref) => ref === document.activeElement
      );

      if (activeIndex !== -1) {
        const cols = 4; // You can make this dynamic later if needed
        let nextIndex = -1;

        if (e.key === "ArrowRight") {
          nextIndex = (activeIndex + 1) % cardRefs.current.length;
        } else if (e.key === "ArrowLeft") {
          nextIndex =
            (activeIndex - 1 + cardRefs.current.length) %
            cardRefs.current.length;
        } else if (e.key === "ArrowDown") {
          nextIndex = activeIndex + cols;
          if (nextIndex >= cardRefs.current.length) return;
        } else if (e.key === "ArrowUp") {
          nextIndex = activeIndex - cols;
          if (nextIndex < 0) return;
        }

        if (nextIndex !== -1 && cardRefs.current[nextIndex]) {
          e.preventDefault();
          cardRefs.current[nextIndex]?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredDoctors.map((doc, index) => (
        <DoctorCard
          key={doc.id}
          doctor={doc}
          onBook={setSelecteddoctorDetails}
          buttonRef={(el) => (cardRefs.current[index] = el)}
        />
      ))}
    </div>
  );
};

export default DoctorsGrid;
