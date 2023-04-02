import AuthProvider from './context/AuthProvider';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layout/Header"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signups from "./pages/Signups"

function App() {
    
  return (
    <Router>
      <AuthProvider>
      <Header/>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/signin" element = {<Signin/>}/>
        <Route path = "/signup" element = {<Signups/>}/>
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;