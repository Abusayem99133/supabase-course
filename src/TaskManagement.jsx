import { useEffect, useState } from "react";
import { supabase } from "./supabase/SupabaseClient";
// interface Task {
//   id: Number;
//   title: String;
//   description: String;
//   created_at: String
// }
function TaskManagement() {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState([]);
  const [newDescription, setNewDescription] = useState("");
  const fetchTasks = async () => {
    const { error, data } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.log("Error reading task:", error.message);
      return;
    }
    setTasks(data);
  };
  const updateTask = async (id) => {
    const { error } = await supabase
      .from("tasks")
      .update({ description: newDescription })
      .eq("id", id);
    if (error) {
      console.error("Error updating task:", error.message);
      return;
    }
  };
  const handleDelete = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      console.error("Error deleting task:", error.message);
      return;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("tasks").insert(newTask).single();
    if (error) {
      console.error("Error adding task:", error.message);
      return;
    }
    setNewTask({ title: "", description: "" });
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  console.log(tasks);
  return (
    <>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
        <h2>Task Manager CRUD</h2>
        {/* form to add a new task */}
        <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
          <input
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, title: e.target.value }))
            }
            type="text"
            placeholder="Task Title"
            style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
          />
          <textarea
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Task Description"
            style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
          />
          <button
            type="submit"
            style={{
              padding: "0.5rem",
            }}
          >
            Add Task
          </button>
        </form>

        {/* List of Tasks */}

        <ul style={{ listStyle: "none", padding: "0" }}>
          {tasks?.map((task) => (
            <li
              key={task.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div>
                  <textarea
                    placeholder="Updated description"
                    onChange={(e) => setNewDescription(e.target.value)}
                  ></textarea>
                  <button
                    onClick={() => updateTask(task?.id)}
                    style={{ padding: "0.5rem", marginRight: "0.5rem" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task?.id)}
                    style={{ padding: "0.5rem" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TaskManagement;
