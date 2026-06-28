import { useState, useEffect  } from "react";
import "./Dashboard.css";
import { toast } from "react-toastify";
import useUsers from "../hooks/useUsers";
import UserTable from "../components/UserTable/UserTable";
import SearchBar from "../components/SearchBar/SearchBar";
import UserForm from "../components/UserForm/UserForm";
import FilterPopup from "../components/FilterPopup/FilterPopup";
import Pagination from "../components/Pagination/Pagination";
import Loader from "../components/Loader/Loader";
import {
    createUser,
    updateUser,
    deleteUser,
} from "../api/userApi";

function Dashboard() {
  const { users, loading, error, setUsers } = useUsers();

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [sortField, setSortField] = useState("");
const [sortOrder, setSortOrder] = useState("asc");
const [showFilter, setShowFilter] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(10);

const [filters, setFilters] = useState({
  firstName: "",
  lastName: "",
  email: "",
  department: "All",
});

useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters, pageSize]);

  if (loading) return <Loader />;

  if (error) {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        color: "red",
      }}
    >
      <h2>⚠ Failed to load users</h2>
      <p>{error}</p>
    </div>
  );
};

  const filteredUsers = users
  .filter((user) => {
    const search = searchTerm.toLowerCase();

    return (
      user.firstName.toLowerCase().includes(search) ||
      user.lastName.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.department.toLowerCase().includes(search)
    );
  })
  .filter((user) => {
    return (
      user.firstName
        .toLowerCase()
        .includes(filters.firstName.toLowerCase()) &&
      user.lastName
        .toLowerCase()
        .includes(filters.lastName.toLowerCase()) &&
      user.email
        .toLowerCase()
        .includes(filters.email.toLowerCase()) &&
      (filters.department === "All" ||
        user.department === filters.department)
    );
  })
  .sort((a, b) => {
    if (!sortField) return 0;

    const valueA = a[sortField].toString().toLowerCase();
    const valueB = b[sortField].toString().toLowerCase();

    return sortOrder === "asc"
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  });

  const handleSaveUser = async (user) => {
  try {
    if (editingUser) {
      await updateUser(editingUser.id, user);

      const updatedUsers = users.map((u) =>
        u.id === editingUser.id
          ? { ...user, id: editingUser.id }
          : u
      );

      setUsers(updatedUsers);
      toast.success("User updated successfully!");
    } else {
      const newUser = await createUser(user);

      setUsers([
        ...users,
        {
          ...newUser,
          id: users.length + 1,
        },
      ]);
      toast.success("User added successfully!");
    }

    setEditingUser(null);
    setShowForm(false);
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }
};

const totalPages = Math.max(
  1,
  Math.ceil(filteredUsers.length / pageSize)
);

const startIndex = (currentPage - 1) * pageSize;

const currentUsers = filteredUsers.slice(
  startIndex,
  startIndex + pageSize
);

const handleEditUser = (user) => {
  setEditingUser(user);
  setShowForm(true);
};

const handleDeleteUser = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) return;

  try {
    await deleteUser(id);

    const updatedUsers = users.filter(
      (user) => user.id !== id
    );

    setUsers(updatedUsers);
    toast.success("User deleted successfully!");
  } catch (error) {
  console.error(error);
  toast.error("Failed to delete user!");
}
};

const handleSort = (field) => {
  if (sortField === field) {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  } else {
    setSortField(field);
    setSortOrder("asc");
  }
};

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">
        User Management Dashboard
      </h1>

      <div className="toolbar">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="toolbar-right">
          <button
  className="filter-btn"
  onClick={() => setShowFilter(true)}
>
  Filter
</button>

          <button
            className="add-btn"
            onClick={() => {
              setEditingUser(null);
              setShowForm(true);
            }}
          >
            Add User
          </button>
        </div>
      </div>

      <UserTable users={currentUsers} onEdit={handleEditUser} onDelete={handleDeleteUser} onSort={handleSort}/>
       <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
        />
      <UserForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        editingUser={editingUser}
        onSave={handleSaveUser}
      />

      <FilterPopup
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={setFilters}
        />
    </div>

    
  );
}

export default Dashboard;