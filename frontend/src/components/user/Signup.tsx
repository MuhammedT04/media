import React, { useState } from "react";
import { APIURL } from "../../constants";

const Signup = () => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const namePattern = /^[a-zA-Z\s]{4,}$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/
    
    if(!signUpData.name.trim() || !namePattern.test(signUpData.name)){
      setError('Invalid name. Please enter at least 4 letters.');
      return;
    }
    if(!passwordRegex.test(signUpData.password)){
      setError('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.');
      return;
    }

    try {
      const res = await fetch(APIURL+"/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      const data = await res.json();

      if (data.errors) {
        // Handle successful signup - you can replace this with your preferred navigation method
        window.location.href = "/login";
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className=" flex min-h-screen justify-center items-center bg-[#F3F4F6] pt-0 overflow-x-hidden">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-lg">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Sign Up</h1>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-submit">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <input
                  className="w-full h-10 border-b-2 border-gray-300 outline-none px-4 transition-colors focus:border-black"
                  placeholder="Name"
                  type="text"
                  onChange={(e) => {
                    setSignUpData({ ...signUpData, name: e.target.value });
                  }}
                />
              </div>

              <div className="relative">
                <input
                  className="w-full h-10 border-b-2 border-gray-300 outline-none px-4 transition-colors focus:border-black"
                  placeholder="Email"
                  type="email"
                  onChange={(e) => {
                    setSignUpData({ ...signUpData, email: e.target.value });
                  }}
                />
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full h-10 border-b-2 border-gray-300 outline-none px-4 pr-12 transition-colors focus:border-black"
                  required
                  onChange={(e) => {
                    setSignUpData({ ...signUpData, password: e.target.value });
                  }}
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                />
                <span>Remember me</span>
              </div>
              <button 
                type="button"
                className="text-gray-600 hover:text-black"
                onClick={() => window.location.href = "/forgot-password"}
              >
                Forgot Password?
              </button>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full max-w-xs px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="text-center text-sm">
            <span>Already have an account? </span>
            <a 
              href="/login"
              className="font-bold hover:text-gray-800 cursor-pointer"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;