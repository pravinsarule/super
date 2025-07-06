
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import backgroundVideo from "../../Assets/Images/vido.mp4";

// export const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       navigate("/dashboard", { replace: true });
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     if (!email || !password) {
//       setError("All fields are required.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post("https://super-admin-ga55.onrender.com/api/auth/login", {
//         email,
//         password,
//       });

//       const { token, user } = res.data;

//       if (token) {
//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(user)); // store user info for header
//         navigate("/dashboard", { replace: true });
//       } else {
//         throw new Error("Invalid response from server");
//       }

//     } catch (err) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       setError(err.response?.data?.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden">
//       <video
//         src={backgroundVideo}
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute top-0 left-0 w-full h-full object-cover"
//       />
//       <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>

//       <div className="relative w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border-2 border-blue-900 bg-opacity-95 z-10">
//         <h2 className="text-2xl font-bold text-center text-red-700 uppercase">Login</h2>

//         {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

//         <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-blue-900 font-bold">Email</label>
//             <input
//               type="email"
//               className="w-full px-4 py-2 mt-1 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="block text-blue-900 font-bold">Password</label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 mt-1 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full px-6 py-3 font-bold text-white bg-blue-900 rounded-lg hover:bg-red-700 transition"
//             disabled={loading}
//           >
//             {loading ? "Please wait..." : "Continue"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// src/Pages/Login/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundVideo from "../../Assets/Images/vido.mp4";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("https://super-gkcn.onrender.com/api/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard", { replace: true });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Handle invalid token error or general login failure
      if (err.response && err.response.status === 401) {
        setError("Invalid token. Please log in again.");
        // Optionally, you can clear the user's session or force a redirect here
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        setError(err.response?.data?.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden">
      <video
        src={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>

      <div className="relative w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border-2 border-blue-900 bg-opacity-95 z-10">
        <h2 className="text-2xl font-bold text-center text-red-700 uppercase">Login</h2>

        {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-blue-900 font-bold">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-blue-900 font-bold">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 font-bold text-white bg-blue-900 rounded-lg hover:bg-red-700 transition"
            disabled={loading}
          >
            {loading ? "Please wait..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};
