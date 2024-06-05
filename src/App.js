import { Component } from "react";
import { MyProvider } from "./components/context.js";
import Navbar from "./components/Menu/Navbar.js";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard.js";
import Dispo from "./components/Disponobilite/Dispo.js";
import Formulaire from "./components/Formulaire/Formulaire.js";
import Ajouter from "./components/Ajouter/Ajouter.js";
import Demande from "./components/Demande/Demande.js";
import Modal from "./components/Modals/modal.js";
import Login from "./login/login.js";
import Signup from "./components/signup/signup.js";


class App extends Component{

  render(){
    
    return (
      <Router>
        <div className="App">
          <MyProvider>
                <Routes>
                  <Route path="/" element={<Login/>}/>
                </Routes>
                 
                <Routes>
                
                  
                  <Route path="/dashboard" element={<Dashboard/>}/>
                  <Route path="/dispo" element={<Dispo/>}/>
                  <Route path="/enregistrer" element={<Formulaire/>}/>
                  <Route path="/reservation" element={<Ajouter/>}/>
                  <Route path="/demande" element={<Demande/>}/>
                  <Route path="/signup" element={<Signup/>}/>
                </Routes>
              
          </MyProvider>

          
        
      </div>
      </Router>
      
    );
  }
}


export default App;