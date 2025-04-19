import React from "react";
import { specialties } from "../mock/doctors";
import { check } from "../assets/icons";

type Props = {
  selectedSpecialty: string;
  onSpecialtyChange: (val: string) => void;
  onlyAvailable: boolean;
  onAvailabilityToggle: () => void;
};

const FilterBar: React.FC<Props> = ({
  selectedSpecialty,
  onSpecialtyChange,
  onlyAvailable,
  onAvailabilityToggle,
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-white font-bold">Filter by:</h2>
      <div className="flex flex-wrap gap-8 items-center mb-6">
        <select
          value={selectedSpecialty}
          onChange={(e) => onSpecialtyChange(e.target.value)}
          className="px-2 py-1 lg:px-4 lg:py-2 bg-black/35 border border-black text-white shadow-sm focus:outline-none focus:ring-[4px] focus:ring-white cursor-pointer"
          aria-label="Filter by Specialty"
        >
          <option value="All">All Specialties</option>
          {specialties?.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>

        <label className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={onAvailabilityToggle}
            aria-label="Show only available doctors"
            className="w-[20px] h-[20px] lg:w-[30px] lg:h-[30px] mr-[15px] appearance-none border-2 border-main-color focus:outline-none focus:ring-[4px] focus:ring-white"
          />
          <span className="text-sm text-white font-semibold">
            Available Only
          </span>

          <div
            className={`w-[20px] h-[20px] lg:w-[30px] lg:h-[30px] bg-main-color absolute top-0 left-0 ${
              onlyAvailable ? "opacity-100" : "opacity-0"
            } duration-100 flex items-center justify-center`}
          >
            <img className="w-[35px]" src={check} alt="" />
          </div>
        </label>
      </div>
    </div>
  );
};

export default FilterBar;
