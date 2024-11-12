import { useEffect, useState } from "react";
import AddTask from "./componentes/AddTask";
import Tasks from "./componentes/Tasks";
import { v4 } from "uuid";
import Logo from "./imagens/imagem.jpg";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setTasks(data);
    };
    //SE QUISER VODE PODE CHAMAR UMA API PARA PEGAR OS
    //fetchTasks();
  }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-black flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <img src={Logo} alt="Tela fundo" title="Tela fundo" />
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          AGENDA TELEFONICA
        </h1>
        <h1 className="text-3xl text-slate-300 font-bold text-center">
          Empressa pessoal
        </h1>

        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
