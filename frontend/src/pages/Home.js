import { Form }  from "../components/Form";
import { useContext } from "react";
import { Todolist } from "../components/todoList";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";


const Home = ()=>{
    const { isLoggedIn } = useContext(AuthContext);
    if (isLoggedIn===false) {
        return <Navigate to="/signin" />;
      }
      else {
    return (
        <>
        <Form/>
        <Todolist/>
        </>
    )}
}

export default Home;