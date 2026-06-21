import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login as apiLogin } from "../api";
import { useAuth } from "../AuthContext";
import Button from "../components/Button";
import Input from "../components/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);
    try {
      const data = await apiLogin(email, password);
      login(data);
      toast.success("Successfully logged in!");
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Invalid email or password";
      setLoginError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) return null;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <div className="w-full max-w-sm p-8 bg-white shadow-sm border border-slate-100 rounded-xl">
        <h2 className="text-3xl font-bold text-blue-500 mb-2">Go Business</h2>
        <p className="text-slate-500 text-sm mb-6">
          Sign in to open your referral dashboard.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="•••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            className="w-full mt-2 bg-blue-500 hover:bg-blue-600 rounded-lg py-2"
            isLoading={isLoading}
          >
            Sign in
          </Button>
          {loginError && (
            <p className="text-red-500 text-sm text-center mt-2">
              {loginError}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
