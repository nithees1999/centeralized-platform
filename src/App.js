import ChatBot from "./Components/Chatbot";
import NavBar from "./Components/NavBar";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div>
    <NavBar/>
    <Outlet />
    <ChatBot />
    </div>
  )
}