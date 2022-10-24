import axios from "axios";
import Link from "next/link";


export async function getTodosRequest() {
    const response = await axios.get("/api")
    return response.data
}

export async function postTodoRequest(todo) {
    return await axios.post("/api", todo)
}

export async function deleteTodoRequest(id) {
    console.log(id)
    return await axios.delete("/api", { data: id})
}

export async function updateTodoRequest(id) {
    return await axios.patch("/api", {data: id})
}