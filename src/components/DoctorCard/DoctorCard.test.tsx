import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import DoctorCard from "./DoctorCard";

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

import { toast } from "sonner";

const mockDoctorAvailable = {
  id: "1",
  name: "Dr. John Doe",
  specialty: "Cardiology",
  rating: 4.5,
  location: "Cairo",
  photo: "https://via.placeholder.com/150",
  availability: ["2025-04-22T09:00:00"],
};

const mockDoctorUnavailable = {
  ...mockDoctorAvailable,
  availability: [],
};

describe("DoctorCard Component", () => {
  //=====================================================
  it("renders doctor information correctly", () => {
    render(<DoctorCard doctor={mockDoctorAvailable} onBook={vi.fn()} />);
    expect(screen.getByText(/Dr. John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Cardiology/)).toBeInTheDocument();
    expect(screen.getByText(/⭐ 4.5/)).toBeInTheDocument();
    expect(screen.getByText(/Cairo/)).toBeInTheDocument();
    expect(screen.getByText(/Available/)).toBeInTheDocument();
  });

  //=====================================================
  it("calls onBook when doctor is available", () => {
    const onBookMock = vi.fn();
    render(<DoctorCard doctor={mockDoctorAvailable} onBook={onBookMock} />);
    fireEvent.click(
      screen.getByRole("button", {
        name: /book appointment with dr. john doe/i,
      })
    );
    expect(onBookMock).toHaveBeenCalledWith(mockDoctorAvailable);
  });

  //=====================================================
  it("shows toast error when doctor is not available", () => {
    const onBookMock = vi.fn();
    render(<DoctorCard doctor={mockDoctorUnavailable} onBook={onBookMock} />);
    fireEvent.click(
      screen.getByRole("button", {
        name: /book appointment with dr. john doe/i,
      })
    );
    expect(toast.error).toHaveBeenCalledWith("Doctor is not available");
    expect(onBookMock).not.toHaveBeenCalled();
  });
});
