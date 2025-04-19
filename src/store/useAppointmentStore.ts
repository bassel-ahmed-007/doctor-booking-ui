import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AppointmentTypes } from "../types";
import { toast } from "sonner";

type Store = {
  bookedAppointments: AppointmentTypes[];
  bookAppointment: (appt: AppointmentTypes) => void;
  cancelAppointment: (apptId: string, apptTime: string) => void;
};

export const useAppointmentStore = create<Store>()(
  persist(
    (set, get) => ({
      bookedAppointments: [],

      // booking
      bookAppointment: (appt) => {
        const isAlreadyBooked = get().bookedAppointments.some(
          (item: AppointmentTypes) =>
            item.doctorId === appt.doctorId && item.time === appt.time
        );

        if (isAlreadyBooked) {
          toast.error("This doctor is already booked at that time.");
          return;
        }

        set((state) => ({
          bookedAppointments: [...state.bookedAppointments, appt],
        }));
        toast.success("Appointment booked!");
      },

      // canceling appointments
      cancelAppointment: (apptId, apptTime) => {
        set((state) => ({
          bookedAppointments: state.bookedAppointments.filter(
            (appt) => appt.doctorId !== apptId || appt.time !== apptTime
          ),
        }));

        toast.success("Appointment canceled");
      },
    }),
    {
      name: "appointments",
    }
  )
);
