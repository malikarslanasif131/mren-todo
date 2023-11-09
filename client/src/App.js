import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShowTodoList } from "./components/showTodoList";

// import "./App.scss";

function App() {
  return (
    <div className="app-contents">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ShowTodoList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
