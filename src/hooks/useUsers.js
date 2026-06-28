import { useEffect, useState } from "react";
import { getUsers } from "../api/userApi";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const data = await getUsers();

      const updatedUsers = data.map((user) => {
        const names = user.name.split(" ");

        return {
          ...user,
          firstName: names[0],
          lastName: names.slice(1).join(" "),
          department: [
            "IT",
            "HR",
            "Finance",
            "Sales",
            "Marketing",
            "Engineering",
          ][Math.floor(Math.random() * 6)],
        };
      });

      setUsers(updatedUsers);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    setUsers,
  };
};

export default useUsers;