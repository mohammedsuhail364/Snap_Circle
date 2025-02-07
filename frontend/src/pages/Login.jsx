import { useContext, useState, useEffect } from "react";
import { Appcontext } from "../context/Appcontext";
import { motion } from "framer-motion";
import { Lock, Mail, X } from "lucide-react";
import { assets } from "../assets/assests";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("Login");
  const { token, setToken, logout, user, setUser } = useContext(Appcontext);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  });
  async function registerService() {
    try {
      const { data } = await axiosInstance.post("/auth/register", {
        userEmail,
        userName,
        password,
        role: "user",
      });
      return data;
    } catch (error) {
      console.log("Error in registerService:", error.message || error);
      throw error;
    }
  }
  async function loginService() {
    try {
      const { data } = await axiosInstance.post("/auth/login", {
        userEmail,
        password,
      });
      return data;
    } catch (error) {
      alert("check you email or password");
      console.log("Error in registerService:", error.message || error);
      throw error;
    }
  }
  async function handleSubmit(event) {
    event.preventDefault();
    if (state === "Signup") {
      if (!userName || !userEmail || !password) {
        return;
      }
      const response = await registerService();

      if (response.success) {
        setUser(response.data);
        setToken(true);
        sessionStorage.setItem("token", "authenticate");
        sessionStorage.setItem("user", JSON.stringify(response.user));
        sessionStorage.setItem("photographer",JSON.stringify(response.photographer))

        navigate("/");
      }
    } else if (state === "Login") {
      if (!userEmail || !password) {
        return;
      }
      const response = await loginService();

      if (response.success) {
        setUser(response.data.user);
        setToken(true);
        sessionStorage.setItem("token", "authenticate");
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        sessionStorage.setItem("photographer",JSON.stringify(response.data.photographer));

        navigate("/");
      }
    }
  }
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center backdrop-blur-sm bg-black/30">
      <motion.form
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm">Welcome back! Please {state} to continue</p>

        {state === "Signup" ? (
          <div className="border px-6 py-2 flex items-center gap-2.5 rounded-full mt-4">
            <img className="w-8" src={assets.profile_icon} />
            <input
              onChange={(e) => setUserName(e.target.value)}
              className="outline-none text-sm"
              type="text"
              placeholder="Full userName"
              required
            />
          </div>
        ) : (
          ""
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <Mail />
          <input
            onChange={(e) => setUserEmail(e.target.value)}
            className="outline-none text-sm"
            type="userEmail"
            placeholder="userEmail id"
            required
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <Lock />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none text-sm"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Forgot Password?
        </p>
        <button
          className="bg-blue-600 w-full text-white py-2 rounded-full"
          onClick={handleSubmit}
        >
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        <p
          onClick={() => setState("Signup")}
          className={`${state === "Login" ? "" : "hidden"} mt-5 text-center`}
        >
          Don{"'"}t have an account?{" "}
          <span className="text-blue-500 cursor-pointer">Sign Up</span>
        </p>

        <p
          onClick={() => setState("Login")}
          className={`${state === "Signup" ? "" : "hidden"} mt-5 text-center`}
        >
          Already have an account?{" "}
          <span className="text-blue-500 cursor-pointer">Login</span>
        </p>

        {/* <X
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        /> */}
      </motion.form>
    </div>
  );
};

export default Login;
