import { useAppointmentStore } from "../store/useAppointmentStore";

type Props = {
  onClose: () => void;
};

const AppointmentsListModal = ({ onClose }: Props) => {
  const bookedAppointments = useAppointmentStore(
    (state) => state.bookedAppointments
  );

  const cancelAppointment = useAppointmentStore(
    (state) => state.cancelAppointment
  );

  return (
    <div
      className="fixed inset-0 bg-black/85 bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointments-list-modal-title"
    >
      <div className="bg-black bg-opacity-50 border border-main-color rounded-xl p-2 lg:p-6 w-[90%] max-w-xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 id="booking-modal-title" className="text-xl text-white font-bold">
            My Appointments
          </h2>

          <button
            onClick={onClose}
            type="button"
            role="close"
            className="w-[30px] h-[30px] text-white font-bold p-[5px] border-[2px] rounded-full flex items-center justify-center focus:outline-none focus:ring-[4px] focus:ring-main-color hover:text-black hover:bg-white hover:border-[2px] duration-200 cursor-pointer"
          >
            x
          </button>
        </div>

        {bookedAppointments.length === 0 ? (
          <div className="py-10 flex items-center justify-center">
            <p className=" text-white">No appointments booked yet.</p>
          </div>
        ) : (
          <ul className="p-5 space-y-4 max-h-[500px] overflow-auto scroll">
            {bookedAppointments.map((appt, index) => (
              <li
                key={index}
                className="border border-white p-4 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-white hover:scale-105 duration-200"
                role="listitem"
              >
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <img
                    src={appt?.doctorPhoto}
                    alt={`${appt?.doctorName}'s profile`}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <p className="font-semibold">{appt?.doctorName}</p>
                    <p className="text-sm ">{appt?.specialty}</p>
                    <p className="text-sm">{appt?.location}</p>
                    <p className="text-sm">{appt?.time}</p>
                  </div>
                </div>

                <button
                  onClick={() => cancelAppointment(appt?.doctorId, appt?.time)}
                  type="button"
                  role="cancel"
                  className="text-red-600 font-bold p-[5px] border-[2px] rounded-[10px] flex items-center justify-center hover:text-white hover:bg-red-600 hover:border-red-600 focus:outline-none focus:ring-[4px] focus:ring-main-color duration-200 cursor-pointer"
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AppointmentsListModal;
