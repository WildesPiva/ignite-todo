import { FormEvent, useState } from "react";
import "./styles/global.scss";
import "./styles/todos.scss";

interface ToDo {
  description: string;
  id: number;
}

export function App() {
  const [todos, setTodos] = useState<ToDo[]>([]);

  const addTodo = (todo: ToDo) => {
    setTodos((todos) => [todo, ...todos]);
  };

  const removeTodo = (id: number) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const handleSubmitTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);

    const { description } = Object.fromEntries(formData);
    if (!description) {
      return;
    }
    addTodo({ description: String(description), id: new Date().getTime() });

    form.reset();
  };

  return (
    <section className="todo-list">
      <h1>To Do</h1>

      <form onSubmit={handleSubmitTodo}>
        <input
          type="text"
          name="description"
          placeholder="Digite a descrição aqui..."
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <p>{todo.description}</p>
              <button type="button" onClick={() => removeTodo(todo.id)}>
                X
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
