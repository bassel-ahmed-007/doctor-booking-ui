export type DoctorTypes = {
  id: string;
  name: string;
  photo: string;
  specialty: string;
  rating: number;
  availability: string[];
  location: string;
};

export type AppointmentTypes = {
  doctorId: string;
  doctorName: string;
  doctorPhoto: string;
  time: string;
  specialty: string;
  location: string;
};
