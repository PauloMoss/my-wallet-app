import { Link, useHistory } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import Loader from "react-loader-spinner";
import axios from 'axios';

import UserContext from '../../contexts/UserContext';
import { Container, Input, Button, UserAlert } from './Styles';

export default function Login() {
    
    const history = useHistory();
    const { userProfile, setUserProfile } = useContext(UserContext);
    const [user, setUser] = useState({ email: "", password: "" });
    const [buttonStatus, setButtonStatus] = useState({ status:"Entrar", userAlert: "", isDisabled: false});
    
    useEffect(()=>{
        if (userProfile){
            history.push("/home");
            return ;
        }
        // eslint-disable-next-line
    }, [])

    const { email, password } = user
    const { status, userAlert, isDisabled } = buttonStatus;
    let checkBox;

    function handleOnChange(e, objKey) {
        setUser({...user, [objKey]: e.target.value})
    }
    
    function userLogIn(event) {

        event.preventDefault();
        setButtonStatus({status:<Loader type="ThreeDots" color="#FFFFFF" height={19} width={50}/>, userAlert: "", isDisabled: true});

        const body = user;
        const request = axios.post('http://localhost:4000/login', body);

        request.then((r) => {
            setUserProfile(r.data);
            console.log(r.data.token)
            if(checkBox) {
                const loginSaved = JSON.stringify(r.data);
                localStorage.setItem("lastLogin", loginSaved);
            }
            history.push("/home");
        })
        request.catch(erro => {
            setButtonStatus({ status:"Entrar", userAlert: <UserAlert>Usuario ou senha invalida</UserAlert>, isDisabled: false});
        })
        setUser({ email: "", password: "" });
    }

    return(
        <>
            <Container>
                <h1>MyWallet</h1>
                <form onSubmit={userLogIn}>
                    <Input type="email" placeholder="Email" value={email} required disabled={isDisabled} onChange={e => handleOnChange(e, "email")}/>
                    <Input type="password" placeholder="Senha" value={password} required disabled={isDisabled} onChange={e => handleOnChange(e, "password")} />
                    <div style={{color: '#FFFFFF'}}><input type="checkbox" onChange={(e) => {checkBox = e.target.checked}}/> manhenha-se conectado</div>
                    <Button type="submit">{status}</Button>
                </form>
                <Link to= "/signup" ><span>Primeira vez? Cadastre-se!</span></Link>
                {userAlert}
            </Container>
        </>
    );
}