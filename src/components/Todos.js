import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  todosSelector,
  checkComplete,
  deleteTodo,
  getTodos,
} from "../redux/reducers/todosSlice";
import TodoForm from "../components/TodoForm";

const Todos = () => {
  const todos = useSelector(todosSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const checkMark = (id) => {
    dispatch(checkComplete(id));
  };

  const deleteEachTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="todo-list">
      <TodoForm />
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id} className={todo.complete ? "completed" : ""}>
              {todo.title}
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={checkMark.bind(this, todo.id)}
              />
              <button onClick={deleteEachTodo.bind(this, todo.id)}>
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todos;
