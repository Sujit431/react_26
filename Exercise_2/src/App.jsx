import Dashboard from "./components/Dashboard";
import Counter from "./components/Counter";
import SearchBar from "./components/SearchBar";
import SecretMessage from "./components/SecretMessage";
import TodoList from "./components/TodoList";
import FocusForm from "./components/FocusForm";
import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      <main className="app-main">
        <Dashboard />
        <Counter />
        <SearchBar />
        <SecretMessage />
        <TodoList />
        <FocusForm />
      </main>
    </div>
  );
}

export default App;
