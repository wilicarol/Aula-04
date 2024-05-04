/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { CalculadoraIMC } from "./Aula04/CalculadoraIMC/services/Imc";
import { LocalStorageAdapter } from "./CalculadoraIMC/repository/LocalStorageAdapter";
import { Task } from "./CalculadoraIMC/models/Task";

type FormData = {
  title: string;
  description: string;
  targetDate: string;
  type?: string;
  priority?: string;
};

function App() {
  const localStorageAdapter = new LocalStorageAdapter();
  const tasks = new CalculadoraIMC(localStorageAdapter);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    targetDate: "",
    type: "",
    priority: "",
  });

  const [action, setAction] = useState("create");

  const [tasksList, setTasksList] = useState<Task[]>([]);

  const onChangeInput = (field: string, data: string) => {
    setFormData((currentData) => ({
      ...currentData,
      [field]: data,
    }));
  };

  const createTask = () => {
    tasks.add(formData);
  };

  const getTasks = useCallback(() => {
    const list = tasks.getTasks() as Task[];
    console.log(list);
    if (!list) {
      return;
    }
    setTasksList(list);
  }, [tasks]);

  const onChangeAction = (data: string) => {
    getTasks()
    setAction(data);
  };

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <>
      <div className="box">
        <h1 className="title">ToDo List</h1>

        <div className="select-action">
          <select onChange={(e) => onChangeAction(e.target.value)}>
            <option value="create">Criar Tarefa</option>
            <option value="view">Visualizar Tarefas</option>
          </select>
        </div>

        {action === "create" && (
          <form className="container">
            <h2>Criar tarefa</h2>
            <div className="input-div">
              <label>Nome</label>
              <div
                style={{
                  width: "10rem",
                }}
              >
                <input
                  style={{
                    width: "95%",
                  }}
                  type="text"
                  onChange={(e) => onChangeInput("title", e.target.value)}
                ></input>
              </div>
            </div>

            <div className="input-div">
              <label>Data de entrega</label>
              <div
                style={{
                  width: "10rem",
                }}
              >
                <input
                  style={{
                    width: "95%",
                  }}
                  type="text"
                  onChange={(e) => onChangeInput("targetDate", e.target.value)}
                ></input>
              </div>
            </div>

            <div className="input-div">
              <label>Tipo</label>
              <div
                style={{
                  width: "10rem",
                }}
              >
                <input
                  style={{
                    width: "95%",
                  }}
                  type="text"
                  onChange={(e) => onChangeInput("type", e.target.value)}
                ></input>
              </div>
            </div>

            <div className="input-div">
              <label>Prioridade</label>
              <div
                style={{
                  width: "10rem",
                }}
              >
                <select
                  style={{
                    width: "100%",
                  }}
                  onChange={(e) => onChangeInput("priority", e.target.value)}
                >
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </select>
              </div>
            </div>

            <div className="input-div">
              <label>Descrição</label>
              <div
                style={{
                  width: "10rem",
                }}
              >
                <textarea
                  rows={10}
                  style={{
                    resize: "none",
                    width: "95%",
                  }}
                  onChange={(e) => onChangeInput("description", e.target.value)}
                ></textarea>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "right",
              }}
              className="input-div"
            >
              <button
                style={{
                  borderRadius: 1,
                  width: "100px",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  createTask();
                }}
              >
                Salvar
              </button>
            </div>
          </form>
        )}

        {action === "view" && (
          <div className="container">
            <div
              style={{
                overflowY: "scroll",
                width: "100%",
                margin: "1rem 0 1rem 0",
              }}
            >
              {tasksList.map((task) => (
                <div
                  style={{
                    margin: "1rem",
                    background: "rgb(200, 200, 200)",
                    padding: '0.5rem',
                    borderRadius: 10,
                    overflow: "hidden"
                  }}
                >
                  <p><b>Titulo:</b> {task.title}</p>
                  <p><b>Descrição:</b> {task.description}</p>
                  <p><b>Prioridade:</b> {task.priority}</p>
                  <p><b>Tipo:</b> {task.type}</p>
                  <p><b>Data Limite:</b> {task.targetDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;