import axios from "axios";
import { SERVER } from "../App";
import { useContext } from "react";
import { ContextProvider } from "../Context/ContextAPI";

const TodoCard = ({ item, fetchData }) => {
	const { token } = useContext(ContextProvider);
	const deleteTodo = async () => {
		try {
			const res = await axios.delete(`${SERVER}/todo/delete/${item._id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			console.log(res)
			if (res.status === 200) {
				fetchData()
			}
		} catch (error) {
			console.log(error)
		}
	}

	const updateTodo = async () => {
		try {
			const res = await axios.put(`${SERVER}/todo/update/${item._id}`, {}, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			console.log(res)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="bg-white shadow-md rounded-lg p-4 border-l-4 transition-all duration-300 hover:shadow-lg"
			style={{
				borderColor: item.priority === "High" ? "red" : item.priority === "Medium" ? "orange" : "green",
			}}
		>
			<h1 className={`text-xl font-bold ${item.isCompleted ? "line-through text-gray-500" : "text-gray-900"}`}>
				{item.title}
			</h1>

			<p className="text-sm text-gray-600">Priority:
				<span className={`font-semibold ml-1 ${item.priority === "High" ? "text-red-600" : item.priority === "Medium" ? "text-orange-600" : "text-green-600"}`}>
					{item.priority}
				</span>
			</p>

			<button className="text-sm mt-1">
				Status:
				<span className={`font-semibold ml-1 ${item.isCompleted ? "text-green-600" : "text-red-600"}`}>
					{item.isCompleted ? "Completed" : "Pending"}
				</span>
			</button>

			<div className="mt-4 flex gap-3">
				<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
					onClick={updateTodo}
				>
					Update
				</button>
				<button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
					onClick={deleteTodo}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default TodoCard;
