import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../lib/api"

import { useUserContext } from "../context/UserContext";

export default function AuthPage() {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const toggleAuth = () => {
    setIsSignIn(!isSignIn);
    setFormData({ username: "", email: "", password: "" });
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { username, email, password } = formData;

    try {
      const response = isSignIn
        ? await api.post("/auth/login", { email, password })
        : await api.post("/auth/signup", { username, email, password });

      const userData = {
        token: response.data.token,
        username: response.data.username,
      };

      localStorage.setItem("userInfo", JSON.stringify(userData));
      setUser(userData);

      toast.success(`Welcome ${userData.username}`);
      setFormData({ username: "", email: "", password: "" });
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
      console.error("Authentication error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4">
      <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-[var(--color-text-primary)]">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>

        <form onSubmit={onSubmit} className="space-y-6">
          {!isSignIn && (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
              required
              className="w-full px-4 py-3 border border-[var(--color-input-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]"
            />
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            className="w-full px-4 py-3 border border-[var(--color-input-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-[var(--color-input-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-colors rounded-md font-semibold text-white shadow-md"
          >
            {loading ? "Loading..." : isSignIn ? "Sign In" : "Sign Up"}
          </button>

          {error && (
            <p className="text-red-700 text-sm text-center mt-2 font-medium">
              {error}
            </p>
          )}

          <p className="text-center text-sm text-[var(--color-text-secondary)] mt-4">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              onClick={toggleAuth}
              className="text-[var(--color-primary)] cursor-pointer font-semibold hover:underline"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
