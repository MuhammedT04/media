import { AppDispatch } from "../../state/store";
import { login, status } from "../../state/lib/User/userSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { Button } from "../ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { APIURL } from "../../constants";

const Login = () => {
  const [loginn, setLong] = useState({ email: "", password: "" });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const submitValue = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const res = await fetch(APIURL+"/api/auth/sign-In", {
      method: "POST",                   
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginn),
    });

    const data = await res.json();
    if (data.message === "Success") {
      dispatch(login(data.user));
      dispatch(status(true));
      navigate("/");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#F3F4F6] p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Sign In</h1>
        </div>

        <form onSubmit={submitValue} className="space-y-6">
          <Toaster />

          <div>
            <input
              className="w-full h-10 border-b-2 border-gray-300 outline-none px-4 focus:border-black"
              placeholder="Email"
              type="email"
              onChange={(e) => setLong({ ...loginn, email: e.target.value })}
            />
          </div>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full h-10 border-b-2 border-gray-300 outline-none px-4 pr-12 focus:border-black"
              required
              onChange={(e) => setLong({ ...loginn, password: e.target.value })}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeOffIcon className="h-5 w-5 text-gray-500" />
              )}
            </Button>
          </div>

          <div className="flex justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-gray-600 hover:text-black">
              Forgot Password?
            </Link>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full max-w-xs px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Sign In
            </Button>
          </div>
        </form>

        <div className="text-center mt-4 text-sm">
          <span>Don't have an account? </span>
          <Link to="/signup" className="font-bold hover:text-gray-800">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
