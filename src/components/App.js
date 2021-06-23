import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "../contexts/UserContext";
import GlobalStyle from "../styles/GlobalStyles";
import Home from './Home/Home';
import Login from './Login_SignUp/Login';
import SignUp from './Login_SignUp/SignUp';

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
            </Switch>
            </UserContext.Provider>
        </Router>
    );
}