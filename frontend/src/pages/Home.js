import { Form }  from "../components/Form";
import { Todolist } from "../components/todoList";
import { Navigate } from "react-router-dom";


const Home = ()=>{
    // const { isLoggedIn } = useContext(AuthContext);
    if (localStorage.getItem('isLoggedIn')===false) {
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