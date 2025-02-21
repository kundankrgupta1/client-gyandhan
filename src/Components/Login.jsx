import { useContext, useState } from "react";
import axios from "axios";
import { ContextProvider } from "../Context/ContextAPI";
import { useNavigate } from "react-router-dom";
import { SERVER } from "../App";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setToken, setUser, setIsAuth } = useContext(ContextProvider);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");

		try {
			const res = await axios.post(`${SERVER}/user/login`, { email, password });
			console.log(res);

			if (res.status === 200) {
				setUser(res.data.user);
				setToken(res.data.token);
				setIsAuth(true);
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("user", JSON.stringify(res.data.user));

				setMessage("Login successful! Redirecting...");
				setTimeout(() => {
					navigate("/");
				}, 2000);
			}
		} catch (error) {
			setMessage("Invalid credentials. Please try again.");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Login to Your Account</h2>
				<p>Demo user for login: <b>user@email.com password: 12345 </b></p>

				{message && <p className="text-center text-sm text-red-600">{message}</p>}

				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Email Input */}
					<div>
						<label className="block text-gray-600 mb-1">Email</label>
						<input
							type="email"
							value={email}
							placeholder="Enter your email"
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>

					{/* Password Input */}
					<div>
						<label className="block text-gray-600 mb-1">Password</label>
						<input
							type="password"
							value={password}
							placeholder="Enter your password"
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>

					{/* Login Button */}
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
						disabled={loading}
					>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>

				<p className="text-center mt-4 text-gray-600">
					Don't have an account?{" "}
					<a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
				</p>
			</div>
		</div>
	);
};

export default Login;
