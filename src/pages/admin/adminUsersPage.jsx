import axios from "axios";
import Loader from "../../components/loader";
import { useEffect, useState } from "react";
import { MdVerified, MdBlock, MdCheckCircle } from "react-icons/md";
import { HiOutlineSearch } from "react-icons/hi";
import toast from "react-hot-toast";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/users/all", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setUsers(response.data);
          setLoaded(true);
        })
        .catch((err) => {
          console.error(err);
          setLoaded(true);
        });
    }
  }, [loaded]);

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    (user.firstName + " " + user.lastName).toLowerCase().includes(search.toLowerCase())
  );

  const toggleBlock = async (user) => {
    try {
      await axios.put(import.meta.env.VITE_BACKEND_URL + `/users/toggle-block/${user.email}`, {
        isBlocked: !user.isBlocked
      },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          }
        });
      toast.success(`User ${user.isBlocked ? 'unblocked' : 'blocked'} successfully`);
      setLoaded(false);
    } catch (error) {
      toast.error("Failed to update user status");
      console.error(error);
    }
  }

  return (
    <div className="w-full h-full flex flex-col relative text-secondary">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-secondary">
          User Management
        </h1>
        <div className="relative">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/50 text-lg" />
          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 rounded-xl border border-secondary/20 bg-white/50 focus:bg-white focus:border-accent outline-none transition w-full sm:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full overflow-hidden bg-white/60 backdrop-blur-md shadow-sm rounded-2xl border border-white/40">
        {loaded ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/5 text-secondary/70 text-xs uppercase tracking-wider border-b border-secondary/10">
                  <th className="py-4 px-6 font-semibold">User</th>
                  <th className="py-4 px-6 font-semibold">Email</th>
                  <th className="py-4 px-6 font-semibold">Role</th>
                  <th className="py-4 px-6 font-semibold">Status</th>
                  <th className="py-4 px-6 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/5">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-white/60 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            className="w-10 h-10 rounded-full object-cover border border-secondary/10 shadow-sm"
                            onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=" + item.firstName + "+" + item.lastName }}
                          />
                          <div>
                            <p className="font-semibold text-secondary flex items-center gap-1">
                              {item.firstName} {item.lastName}
                              {item.isEmailVerified && <MdVerified className="text-accent text-sm" title="Verified Email" />}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-secondary/80">{item.email}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold
                                ${item.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}
                            `}>
                          {item.role}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold
                                ${item.isBlocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}
                            `}>
                          {item.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => toggleBlock(item)}
                          className={`
                                    px-4 py-2 rounded-lg text-xs font-bold transition-all
                                    ${item.isBlocked
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-red-50 text-red-600 hover:bg-red-100"
                            }
                                `}
                        >
                          {item.isBlocked ? "Unblock" : "Block"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-secondary/50">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
