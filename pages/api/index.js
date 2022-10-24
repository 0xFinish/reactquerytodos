import { getTodos, postTodo, deleteTodo, updateTodo } from "../../database/mongodb"

export default function handler(req, res) {
    if (req.method === "GET") {
        getTodos(req, res)
    }
    if (req.method === "POST") {
        postTodo(req, res)
    }
    if (req.method === "DELETE") {
        deleteTodo(req, res)
    }
    if (req.method === "PATCH") {
        updateTodo(req, res)
    }
}