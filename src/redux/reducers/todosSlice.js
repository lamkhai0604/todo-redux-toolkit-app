import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

//Reducer thunk
export const getTodos = createAsyncThunk("todos/todosFetch", async () => {
  const res = await axios.get(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  return res.data;
});

export const addTodo = createAsyncThunk("todos/add", async (title) => {
  const newTodo = {
    id: nanoid(),
    title,
    completed: false,
  };
  await axios.post("https://jsonplaceholder.typicode.com/todos", newTodo);
  return newTodo;
});

export const deleteTodo = createAsyncThunk("todos/delete", async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return id;
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    allTodos: [],
  },
  reducers: {
    // addTodo: {
    //   reducer(state, action) {
    //     state.allTodos.unshift(action.payload);
    //   },
    //   prepare(title) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         title,
    //         completed: false,
    //       },
    //     };
    //   },
    // },
    checkComplete(state, action) {
      const todoId = action.payload;
      state.allTodos = state.allTodos.map((todo) => {
        if (todo.id === todoId) todo.complete = !todo.complete;
        return todo;
      });
    },
    // deleteTodo(state, action) {
    //   const todoId = action.payload;
    //   state.allTodos = state.allTodos.filter((todo) => todo.id !== todoId);
    // },
  },
  extraReducers: {
    //Get all todo
    [getTodos.pending]: (state, action) => {
      console.log("Fetching pending");
    },
    [getTodos.fulfilled]: (state, action) => {
      console.log("Fetching completed");
      state.allTodos = action.payload;
    },
    [getTodos.rejected]: (state, action) => {
      console.log("Fetching rejected");
    },

    //Add todo
    [addTodo.fulfilled]: (state, action) => {
      state.allTodos.unshift(action.payload);
    },

    //Delete todo
    [deleteTodo.fulfilled]: (state, action) => {
      const todoId = action.payload;
      state.allTodos = state.allTodos.filter((todo) => todo.id !== todoId);
    },
  },
});

//Reducer
const todosReducer = todoSlice.reducer;

//Selector
export const todosSelector = (state) => state.todosReducer.allTodos;

//Export action
export const { checkComplete, getAllTodos } = todoSlice.actions;

//Export Reducer
export default todosReducer;
