import { useState } from "react";
import "./FilterPopup.css";

const departments = [
  "All",
  "IT",
  "HR",
  "Finance",
  "Sales",
  "Marketing",
  "Engineering",
];

function FilterPopup({ isOpen, onClose, onApply }) {
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "All",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    const resetFilters = {
      firstName: "",
      lastName: "",
      email: "",
      department: "All",
    };

    setFilters(resetFilters);
    onApply(resetFilters);
  };

  return (
    <div className="modal-overlay">
      <div className="filter-modal">
        <h2>Filter Users</h2>

        <input
          name="firstName"
          placeholder="First Name"
          value={filters.firstName}
          onChange={handleChange}
        />

        <input
          name="lastName"
          placeholder="Last Name"
          value={filters.lastName}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={filters.email}
          onChange={handleChange}
        />

        <select
          name="department"
          value={filters.department}
          onChange={handleChange}
        >
          {departments.map((dept) => (
            <option key={dept}>{dept}</option>
          ))}
        </select>

        <div className="modal-buttons">
          <button
            className="cancel-btn"
            onClick={handleReset}
          >
            Reset
          </button>

          <button
            className="save-btn"
            onClick={() => {
              onApply(filters);
              onClose();
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterPopup;