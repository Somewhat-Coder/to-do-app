import { TasksProvider } from "./context/TasksContext";
import Layout from "./Layout";
import "./App.css";

function App() {
  return (
    <TasksProvider>
      <div className="body">
        <div className="app-container">
          <Layout />
        </div>
      </div>
    </TasksProvider>
  );
}

export default App;
