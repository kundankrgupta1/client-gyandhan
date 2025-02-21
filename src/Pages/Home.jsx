import { useNavigate } from "react-router-dom";
import AllTodos from "../Components/AllTodos"
import { useState } from "react";

const Home = () => {
	const navigate = useNavigate();

	const [filterValue, setFilterValue] = useState("");
	const [sortValue, setSortValue] = useState("");

	return (
		<div className="max-w-[1200px] w-full m-auto">
			<div className="flex justify-between px-20 py-5">
				<button onClick={() => navigate("/add")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add new todos</button>

				<div className="flex gap-4">
					<select
						onChange={(e) => setFilterValue(e.target.value)}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						<option value="">Filter by priority</option>
						<option value="low">low</option>
						<option value="medium">medium</option>
						<option value="high">high</option>
					</select>

					<select
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onChange={(e) => setSortValue(e.target.value)}
					>
						<option value="">Sort</option>
						<option value="new">newest</option>
						<option value="old">oldest</option>

					</select>
				</div>
			</div>


			<AllTodos filterValue={filterValue} sortValue={sortValue} />
		</div>
	)
}

export default Home