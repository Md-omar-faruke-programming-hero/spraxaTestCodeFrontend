import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Home from './Component/Home/Home';
import EditEmployee from './Component/EditEmployee/EditEmployee';

function App() {
  return (

    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login></Login>
          </Route>
          <Route  path="/login">
            <Login></Login>
          </Route>
          <Route  path="/register">
            <Register></Register>
          </Route>
          <Route  path="/home">
            <Home></Home>
          </Route>
          <Route  path="/edit/:id">
             <EditEmployee></EditEmployee>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
