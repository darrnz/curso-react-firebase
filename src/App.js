import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Menu from './componets/Menu'
import Inicio from './componets/Inicio';
import Login from './componets/Login';
import Admin from './componets/Admin';
import { auth } from './firebase.config'
import './App.css';
import Form from './componets/Form';

function App() {

  const [usuario, setUsuario] = useState(null)
  useEffect(() => {
      auth.onAuthStateChanged((user => {
          if(user) {
              setUsuario(user.email)
          }
      }))
  }, [])

  const cerrarSesion = async() => {
      auth.signOut()
      setUsuario(null)
      
  }


  return (
    <div className='container'>
      <Router>
        <Menu usuario={usuario} setUsuario={setUsuario} cerrarSesion={cerrarSesion} />
        <Switch>
          <Route exact path='/' render={(props) => (
            <Inicio {...props} usuario={usuario}/>)} 
          />
          <Route exact path='/login' render={(routeProps) => (
            <Login {...routeProps} usuario={usuario} cerrarSesion={cerrarSesion}/>)}  
          />
          <Route exact path='/admin' component={Admin} />
          <Route exact path='/form' component={Form} />
        </Switch>
      </Router>
      </div>
  );
}

export default App;
