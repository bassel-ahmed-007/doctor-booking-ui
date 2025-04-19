import { Toaster } from "sonner";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Home />
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
