import { useContext } from "react";
import { Form }  from "../components/Form";
import { Todolist } from "../components/todoList";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";


const Home =()=>{
    const status = localStorage.getItem('isLoggedIn')
    // const { isLoggedIn } = useContext(AuthContext);
    // if (isLoggedIn === false)
    if (status === false || status === null || status === undefined)
    
    {
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