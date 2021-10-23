import "./App.css";
import Header from "./components/header/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddUser from "./components/routes/AddUser/AddUser";
import Home from './components/routes/Home/Home';
import AddPosts from './components/routes/AddPosts/AddPosts'


function App() {

const Error = ()=>(
  <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:30}}>
  <h2>404 bad Request.... </h2>
  </div>
);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/add-user" component={AddUser} />
        <Route exact path="/add-user/:id" component={AddUser} />
        <Route exact path="/add-posts" component={AddPosts}/>
        <Route component={Error}/>
      </Switch>
    </Router>
  );
}

export default App;
