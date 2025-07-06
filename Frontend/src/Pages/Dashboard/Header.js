

// src/Components/Header/Header.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiLogOut, FiMenu } from "react-icons/fi";
import { FaPlane, FaCar, FaHotel } from "react-icons/fa";
import profilePlaceholder from "../../Assets/Images/profile.jpg";

export const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isTravelDropdownOpen, setIsTravelDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }, []);

  const logoutCleanup = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    caches.keys().then((names) => names.forEach((name) => caches.delete(name)));
    setUser(null);
    navigate("/", { replace: true });
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        logoutCleanup();
        return;
      }

      const res = await fetch("https://super-admin-ga55.onrender.com/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401 || res.status === 403) {
        alert("Session expired. Please login again.");
      }

      logoutCleanup();
    } catch (err) {
      alert("Logout error. Try again.");
      logoutCleanup();
    }
  };

  const travelOptions = [
    { icon: <FaPlane />, label: "Flights" },
    { icon: <FaCar />, label: "Cab Bookings" },
    { icon: <FaHotel />, label: "Hotel Reservations" },
  ];

  return (
    <header className="bg-white h-20 shadow-sm flex items-center justify-between p-6 sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600 hover:text-gray-800">
          <FiMenu size={24} />
        </button>
        <h2 className="text-gray-900 font-medium">Super Admin</h2>
      </div>

      <div className="flex items-center space-x-6">
        {/* Travel Dropdown */}
        <div className="relative">
          <button onClick={() => setIsTravelDropdownOpen(!isTravelDropdownOpen)} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
            <span className="hidden md:inline">Travel</span>
            <FiChevronDown />
          </button>
          {isTravelDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              {travelOptions.map((option, index) => (
                <div key={index} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  <span className="mr-2">{option.icon}</span>
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Dropdown */}
        <div className="relative">
          <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="flex items-center space-x-3">
            <img
              src={user?.photo || profilePlaceholder}
              alt="User"
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="text-gray-700 hidden md:inline">{user?.name || "Admin"}</span>
            <FiChevronDown className="text-gray-600" />
          </button>
          {isUserDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Settings</div>
              <div
                className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handleLogout();
                  setIsUserDropdownOpen(false);
                }}
              >
                <FiLogOut className="mr-2" /> Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
