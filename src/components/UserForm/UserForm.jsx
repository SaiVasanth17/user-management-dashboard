import { useEffect, useState } from "react";
import "./UserForm.css";

const departments = [
  "IT",
  "HR",
  "Finance",
  "Marketing",
  "Sales",
  "Engineering",
];

function UserForm({
  isOpen,
  onClose,
  onSave,
  editingUser,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "IT",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        department: "IT",
      });
    }
  }, [editingUser]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
  const newErrors = {};

  if (!formData.firstName.trim()) {
    newErrors.firstName = "First Name is required";
  } else if (formData.firstName.length < 3) {
    newErrors.firstName = "Minimum 3 characters";
  }

  if (!formData.lastName.trim()) {
    newErrors.lastName = "Last Name is required";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
  ) {
    newErrors.email = "Invalid email address";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  onSave(formData);
};

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>
          {editingUser ? "Edit User" : "Add User"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && (
  <p className="error">{errors.firstName}</p>
)}

          <input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && (
  <p className="error">{errors.lastName}</p>
)}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
  <p className="error">{errors.email}</p>
)}

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            {departments.map((dept) => (
              <option key={dept}>{dept}</option>
            ))}
          </select>

          <div className="modal-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Save
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default UserForm;