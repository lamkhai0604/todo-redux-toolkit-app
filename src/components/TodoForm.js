import { useState } from "react";
import { addTodo } from "../redux/reducers/todosSlice";
import { useDispatch } from "react-redux";

const TodoForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(title));
    setTitle("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={handleChange} />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default TodoForm;
