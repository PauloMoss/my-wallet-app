import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Loader from "react-loader-spinner";

import { Container, Input, Button, UserAlert } from './Styles';

export default function SignUp() {

    const history = useHistory();
    const [userData, setUserData] = useState({ name: "", email: "",  password: "", confirmPassword: "" });
    const [buttonStatus, setButtonStatus] = useState({ status:"Cadastrar", userAlert: "", isDisabled: false});
    
    const { email, name, password, confirmPassword } = userData
    const { status, userAlert, isDisabled } = buttonStatus;

    function handleOnChange(e, objKey) {
        setUserData({...userData, [objKey]: e.target.value})
    }

    function userSignUp(event) {
        event.preventDefault();
        
        if(password!==confirmPassword) {
            setButtonStatus({...buttonStatus, userAlert: <UserAlert>As senhas precisam ser iguais, preencha novamente.</UserAlert>});
            return;
        }
        setButtonStatus({status:<Loader type="ThreeDots" color="#FFFFFF" height={19} width={50}/>, userAlert: "", isDisabled: true});

        const body = userData;
        const request = axios.post("http://localhost:4000/sign-up", body);
        request.then(() => history.push("/"));
        request.catch(() => {
            setButtonStatus({status:"Cadastrar", userAlert: <UserAlert>Por favor, verifique os dados e tente novamente.</UserAlert>, isDisabled: false});
        })
        setUserData({ name: "", email: "", password: "", confirmPassword: "" });
    }
    
    return(
        <>
            <Container>
                <h1>MyWallet</h1>
                <form onSubmit={userSignUp}>
                    <Input type="text" placeholder="Nome" value={name} required disabled={isDisabled} onChange={e => handleOnChange(e, "name")}/>
                    <Input type="email" placeholder="Email" value={email} required disabled={isDisabled} onChange={e => handleOnChange(e, "email")}/>
                    <Input type="password" placeholder="Senha" value={password} required disabled={isDisabled} onChange={e => handleOnChange(e, "password")}/>
                    <Input type="password" placeholder="Confirme a senha" value={confirmPassword} required disabled={isDisabled} onChange={e => handleOnChange(e, "confirmPassword")}/>
                    <Button type="submit" >{status}</Button>
                </form>
                <Link to="/" ><span>Já tem uma conta? Entre agora!</span></Link>
                {userAlert}
            </Container>
        </>
    );
}