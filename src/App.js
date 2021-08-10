import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "./contexts/UserContext";
import GlobalStyle from "./assets/styles/GlobalStyles";
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Transfer from './pages/Transfer';

export default function App() {

    const alreadyLoggedIn = localStorage.getItem("lastLogin");
    const [userProfile, setUserProfile] = useState(alreadyLoggedIn && JSON.parse(alreadyLoggedIn));
    
    return (
        <Router>
            <UserContext.Provider value={{ userProfile, setUserProfile }}>
            <GlobalStyle /> 
            <Switch>
                <Route exact path ="/">
                    <Login />
                </Route>
                <Route path ="/signup">
                    <SignUp />
                </Route>
                <Route path ="/home">
                    <Home />
                </Route>
                <Route path ="/transfer/:transferType">
                    <Transfer />
                </Route>
            </Switch>
            </UserContext.Provider>
        </Router>
    );
}