import { useEffect, useRef } from "react";
import { useAppointmentStore } from "../store/useAppointmentStore";
import { DoctorTypes } from "../types";

type Props = {
  title: string;
  doctorDetails?: DoctorTypes;
  slot?: string | null;
  onClose: () => void;
};

const ConfirmModal = ({ onClose, title, doctorDetails, slot }: Props) => {
  const bookAppointment = useAppointmentStore((state) => state.bookAppointment);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleConfirm = (time: string) => {
    if (!doctorDetails) return;
    if (!time) return;

    bookAppointment({
      doctorId: doctorDetails?.id,
      doctorName: doctorDetails?.name,
      doctorPhoto: doctorDetails?.photo,
      time,
      specialty: doctorDetails?.specialty,
      location: doctorDetails?.location,
    });
  };

  const selectedSlot = new Date(slot ?? "").toLocaleString();

  useEffect(() => {
    modalRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
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
      <div className="bg-black bg-opacity-80 border border-main-color  rounded-xl p-6 w-[90%] max-w-sm">
        <div className="mb-3 flex flex-col items-center justify-center gap-2 text-white">
          <h2 id="booking-modal-title" className="text-xl font-bold ">
            {title}
          </h2>

          <p>
            Day:{" "}
            <span className="text-main-color font-semibold">
              {selectedSlot.split(",")?.[0]}
            </span>
          </p>
          <p>
            Time:{" "}
            <span className="text-main-color font-semibold">
              {selectedSlot.split(",")?.[1]}
            </span>
          </p>
        </div>

        <div className="flex items-center justify-center gap-16">
          <button
            onClick={() => {
              if (slot) {
                handleConfirm(slot);
                onClose();
              }
            }}
            type="button"
            role="confirm"
            className="mt-2 bg-white text-black px-4 py-2 rounded-xl hover:bg-green-600 hover:text-white duration-300 focus:outline-none focus:ring-[4px] focus:ring-green-600 cursor-pointer"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            type="button"
            role="cancel"
            className="mt-2 bg-white text-black px-4 py-2 rounded-xl hover:bg-red-600 hover:text-white duration-300 focus:outline-none focus:ring-[4px] focus:ring-red-600 cursor-pointer"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
