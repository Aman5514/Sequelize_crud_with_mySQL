import "./App.css";
import Header from "./components/header/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddUser from "./components/routes/AddUser/AddUser";
import Home from './components/routes/Home/Home';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/add-user" component={AddUser} />
        <Route exact path="/add-user/:id" component={AddUser} />
      </Switch>
    </Router>
  );
}

export default App;
