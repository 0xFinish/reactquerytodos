import axios from "axios";

export async function getTodosRequest() {
    const response = await axios.get("http://localhost:3000/api")
    return response.data
}

export async function postTodoRequest(todo) {
    return await axios.post("http://localhost:3000/api", todo)
}

export async function deleteTodoRequest(id) {
    console.log(id)
    return await axios.delete("http://localhost:3000/api", { data: id})
}

export async function updateTodoRequest(id) {
    return await axios.patch("http://localhost:3000/api", {data: id})
}