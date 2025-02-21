import Navbar from "./Components/Navbar"
import AllRoutes from "./Routes/AllRoutes"

export const SERVER = "http://localhost:3000"

const App = () => {
	return (
		<div>
			<Navbar />
			<AllRoutes />
		</div>
	)
}

export default App