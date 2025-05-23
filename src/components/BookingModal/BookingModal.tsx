import React, { useEffect, useRef, useState } from "react";
import { doctors } from "../../mock/doctors";
import { DoctorTypes } from "../../types";
import ConfirmModal from "../ConfirmModal";

type Props = {
  doctorDetails: DoctorTypes;
  onClose: () => void;
};

const BookingModal: React.FC<Props> = ({ doctorDetails, onClose }) => {
  const [showConfrimModal, setShowConfirmModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const doctor = doctors.find((d) => d.id === doctorDetails?.id);

  useEffect(() => {
    modalRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      const activeIndex = slotRefs.current.findIndex(
        (ref) => ref === document.activeElement
      );

      if (activeIndex !== -1) {
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          e.preventDefault();
          const nextIndex = (activeIndex + 1) % slotRefs.current.length;
          slotRefs.current[nextIndex]?.focus();
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          e.preventDefault();
          const prevIndex =
            (activeIndex - 1 + slotRefs.current.length) %
            slotRefs.current.length;
          slotRefs.current[prevIndex]?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/85 bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      ref={modalRef}
      tabIndex={-1}
    >
      <div className="bg-black bg-opacity-80 border border-main-color  rounded-xl p-6 w-[90%] max-w-md">
        <div className="mb-3 flex items-center justify-between text-white">
          <h2 id="booking-modal-title" className="text-xl font-bold ">
            Select a slot
          </h2>

          <button
            onClick={onClose}
            type="button"
            role="close"
            aria-label="close"
            className="w-[30px] h-[30px]  font-bold p-[5px] border-[2px] rounded-full flex items-center justify-center focus:outline-none focus:ring-[4px] focus:ring-main-color hover:text-black hover:bg-white hover:border-[2px] duration-200 cursor-pointer"
          >
            x
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4 text-white">
          <h2 className="font-semibold text-center">{doctor?.name}</h2>
          <h3 className="text-center">{doctor?.specialty}</h3>
          <div className="flex items-center justify-center">
            <img
              src={doctor?.photo}
              alt={`${doctor?.name}'s profile`}
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>

          <p>Available slots:</p>

          <div className="grid lg:grid-cols-2 gap-4 text-white">
            {doctor?.availability?.map((slot, index) => (
              <div key={slot}>
                <button
                  ref={(el) => {
                    slotRefs.current[index] = el;
                  }}
                  onClick={() => {
                    setSelectedSlot(slot);
                    setShowConfirmModal(true);
                  }}
                  role="slot"
                  aria-labelledby={`${new Date(slot).toLocaleString()}`}
                  className="w-full px-4 py-2 border border-white text-white text-sm rounded-xl focus:outline-none focus:ring-[4px] focus:ring-main-color hover:bg-white hover:text-black hover:scale-105 duration-200 cursor-pointer"
                  aria-label={`Select time slot ${slot}`}
                >
                  {new Date(slot).toLocaleString()}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showConfrimModal && (
        <ConfirmModal
          slot={selectedSlot}
          doctorDetails={doctor}
          onClose={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
};

export default BookingModal;
