import { useContext, useEffect, useState } from "react"
import { ContextProvider } from "../Context/ContextAPI"
import axios from "axios";
import TodoCard from "./TodoCard";
import { SERVER } from "../App";

const AllTodos = ({ filterValue, sortValue }) => {
	console.log(filterValue)
	const { token } = useContext(ContextProvider);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false)
	console.log(data)
	const fetchData = async () => {
		setIsLoading(true)
		try {
			const res = await axios.get(`${SERVER}/todo/all?priority=${filterValue}&sort=${sortValue}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			console.log(res)
			setData(res.data.todo);
			setIsLoading(false)
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [filterValue, sortValue])

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen font-bold text-2xl">
				Loading...
			</div>
		)
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{data.length === 0 ? <div className="flex justify-center items-center h-screen font-bold text-2xl">no Task</div> :
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