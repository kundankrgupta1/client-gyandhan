import { useContext, useEffect, useState } from "react"
import { ContextProvider } from "../Context/ContextAPI"
import axios from "axios";
import TodoCard from "./TodoCard";
import { SERVER } from "../App";

const AllTodos = ({ filterValue, sortValue }) => {
	console.log(filterValue)
	const { token } = useContext(ContextProvider);
	const [data, setData] = useState([]);
	console.log(data)
	const fetchData = async () => {
		try {
			const res = await axios.get(`${SERVER}/todo/all?priority=${filterValue}&sort=${sortValue}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			console.log(res)
			setData(res.data.todo);
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [filterValue, sortValue])

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{data.length === 0 ? <>no Task</> :
				data.map((item) => {
					return (
						<TodoCard key={item._id} item={item} fetchData={fetchData} />
					)
				})
			}
		</div>
	)
}

export default AllTodos