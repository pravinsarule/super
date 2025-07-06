
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Sidebar } from "../Dashboard/Sidebar";
import { Header } from "../Dashboard/Header";
import io from "socket.io-client";

const socket = io("https://super-admin-ga55.onrender.com", {
  auth: {
    token: localStorage.getItem("token"),
  },
});

export const Vendor = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [vendors, setVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const fetchVendors = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://super-admin-ga55.onrender.com/api/auth/vendors/getVendors", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        const combined = [
          ...data.deactivationRequests.map((v) => ({ ...v, requestType: "deactivation" })),
          ...data.reactivationRequests.map((v) => ({ ...v, requestType: "reactivation" })),
        ];
        setVendors(combined);
        setCurrentPage(1); // Reset to first page when vendors change
      } else {
        Swal.fire({
          title: "Error",
          text: data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An error occurred while fetching vendors.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    fetchVendors();

    socket.on("vendorStatusChanged", (data) => {
      fetchVendors();
      Swal.fire({
        title: "Vendor Status Updated",
        text: data.message,
        icon: "info",
        confirmButtonText: "OK",
      });
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
      Swal.fire({
        title: "Connection Error",
        text: "Failed to connect to real-time updates.",
        icon: "error",
        confirmButtonText: "OK",
      });
    });

    return () => {
      socket.off("vendorStatusChanged");
      socket.off("connect_error");
    };
  }, []);

  const handleApproveDeactivation = async (id) => {
    const confirm = await Swal.fire({
      title: "Approve Deactivation?",
      text: "Are you sure you want to approve this deactivation request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, approve",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://super-admin-ga55.onrender.com/api/auth/vendors/approveDeactivation/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        Swal.fire({
          title: "Error",
          text: data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Deactivation Approved",
          text: "The vendor's deactivation request has been approved successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch {
      Swal.fire({
        title: "Error",
        text: "Failed to approve deactivation.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleRejectDeactivation = async (id) => {
    const confirm = await Swal.fire({
      title: "Reject Deactivation?",
      text: "Are you sure you want to reject this deactivation request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://super-admin-ga55.onrender.com/api/auth/vendors/reject-deactivation/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        Swal.fire({
          title: "Error",
          text: data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Deactivation Rejected",
          text: "The vendor's deactivation request has been rejected.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch {
      Swal.fire({
        title: "Error",
        text: "Failed to reject deactivation.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleApproveReactivation = async (id) => {
    const confirm = await Swal.fire({
      title: "Approve Reactivation?",
      text: "Are you sure you want to approve this reactivation request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, approve",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://super-admin-ga55.onrender.com/api/auth/vendors/approve-reactivation/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        Swal.fire({
          title: "Error",
          text: data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Reactivation Approved",
          text: "The vendor's reactivation request has been approved successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch {
      Swal.fire({
        title: "Error",
        text: "Failed to approve reactivation.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleRejectReactivation = async (id) => {
    const confirm = await Swal.fire({
      title: "Reject Reactivation?",
      text: "Are you sure you want to reject this reactivation request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://super-admin-ga55.onrender.com/api/auth/vendors/reject-reactivation/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        Swal.fire({
          title: "Error",
          text: data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Reactivation Rejected",
          text: "The vendor's reactivation request has been rejected.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch {
      Swal.fire({
        title: "Error",
        text: "Failed to reject reactivation.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(vendors.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedVendors = vendors.slice(startIndex, endIndex);

  // Ensure table always has pageSize rows
  const tableRows = Array.from({ length: pageSize }, (_, index) => {
    const vendor = paginatedVendors[index];
    if (vendor) {
      return (
        <tr key={vendor.id || index} className="border-b hover:bg-gray-50">
          <td className="px-3 py-2 pl-6">{startIndex + index + 1}</td>
          <td className="px-3 py-2">{vendor.name}</td>
          <td className="px-3 py-2">{vendor.email}</td>
          <td className="px-3 py-2 capitalize">{vendor.requestType}</td>
          <td className="px-3 py-2 text-right space-x-2">
            {vendor.requestType === "deactivation" ? (
              <>
                <button
                  onClick={() => handleApproveDeactivation(vendor.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleRejectDeactivation(vendor.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Reject
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleApproveReactivation(vendor.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleRejectReactivation(vendor.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Reject
                </button>
              </>
            )}
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={`empty-${index}`} className="border-b">
          <td className="px-3 py-2 pl-6">{startIndex + index + 1}</td>
          <td className="px-3 py-2">-</td>
          <td className="px-3 py-2">-</td>
          <td className="px-3 py-2">-</td>
          <td className="px-3 py-2 text-right">-</td>
        </tr>
      );
    }
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className={`flex flex-col w-full transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="p-6 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-md w-full overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4">Pending Requests</h2>
            {vendors.length > 0 ? (
              <>
                <div className="mb-4 text-sm text-gray-600">
                  Showing {Math.min(vendors.length, paginatedVendors.length)} of {vendors.length} vendors
                </div>
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-200 text-left">
                      <th className="px-3 py-2 pl-6">S. No.</th>
                      <th className="px-3 py-2">Vendor Name</th>
                      <th className="px-3 py-2">Email</th>
                      <th className="px-3 py-2">Request Type</th>
                      <th className="px-3 py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>{tableRows}</tbody>
                </table>
                {totalPages > 1 && (
                  <div className="flex justify-center mt-4">
                    <nav className="inline-flex rounded-md shadow">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                          currentPage === 1 ? "hidden" : ""
                        }`}
                      >
                        Previous
                      </button>
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => handlePageChange(index + 1)}
                          className={`px-3 py-2 border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === index + 1 ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                          currentPage === totalPages ? "hidden" : ""
                        }`}
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500">No pending requests at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vendor;