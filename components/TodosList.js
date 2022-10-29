import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTodosRequest,
  postTodoRequest,
  updateTodoRequest,
  deleteTodoRequest,
} from "../requests/requests";
import Link from "next/link";

function TodosList() {
  const queryClient = useQueryClient();

  const [todoData, setTodoData] = React.useState("");

  const { isLoading, isError, isSuccess, data, error } = useQuery(
    ["todos"],
    getTodosRequest
  );

  const addTodoMutation = useMutation(postTodoRequest, {
    onSuccess: () => {
      console.log("Invalidating...");
      queryClient.invalidateQueries("todos");
    },
  });

  const deleteTodoMutation = useMutation(deleteTodoRequest, {
    onSuccess: () => {
      console.log("Invalidating...");
      queryClient.invalidateQueries("todos");
    },
  });

  const updateTodoMutation = useMutation(updateTodoRequest, {
    onSuccess: () => {
      console.log("Invalidating...");
      queryClient.invalidateQueries("todos");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.dir(e.target);
    // postTodoRequest({task: todoData, status: false})
    addTodoMutation.mutate({ task: todoData, status: false });
    setTodoData("");
  }

  function handleDelete(e) {
    e.preventDefault();
    console.dir(e._id);
    // deleteTodoMutation.mutate({ _id: e._id });
    deleteTodoMutation.mutate({ _id: e._id });
  }

  function handleStatusChange(e) {
    e.preventDefault();
    console.dir(e.status);
    updateTodoMutation.mutate({ _id: e._id, status: !e.status });
  }

  if (isLoading) {
    return <p className="text-white w-20 m-auto">Loading...</p>;
  }

  return (
    <div>
      <div className=" flex  flex-col gap-3 w-2/4 m-auto min-w-min bg-teal-700 my-10 items-center align-middle text-white p-6 rounded-lg">
        <h3 className="text-2xl font-bold font-mono mt-5">Todo List</h3>
        <form onSubmit={handleSubmit} className="from-violet-600 flex">
          <input
            placeholder="  Todos"
            className="w-60 h-8 text-black rounded-lg"
            type="text"
            value={todoData}
            onChange={(event) => setTodoData(event.target.value)}
          ></input>
          <button className="h-8 w-28 ml-5 bg-lime-300 rounded-lg border-4 border-amber-500 text-black">
            Add Todo
          </button>
        </form>
        {isSuccess &&
          data.map((val, i) => {
            return (
              <div className="flex justify-between items-center w-full" key={i}>
                <span className="flex items-center">
                  <input
                    className="mr-5 h-6 w-6"
                    type="checkbox"
                    checked={val.status}
                    onChange={(event) => {
                      event._id = val._id;
                      event.status = val.status;
                      handleStatusChange(event);
                    }}
                  ></input>
                  <p task={val.task} key={i} className="text-2xl mr-10 w-72">
                    {val.task}
                  </p>
                </span>
                <button
                  className="px-3 bg-lime-300 h-8 text-black rounded-md border-4 border-amber-500"
                  onClick={(event) => {
                    event._id = val._id;
                    return handleDelete(event);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
          <Link href="https://github.com/fi9ish/reactquerytodos"><button className="mt-10 px-4 py-2 bg-teal-800 text-white rounded-lg">Source Code</button></Link>
      </div>
    </div>
  );
}

export { TodosList };
