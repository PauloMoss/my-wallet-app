import { Link, useHistory } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import Loader from "react-loader-spinner";
import axios from 'axios';
import styled from 'styled-components';

import UserContext from '../contexts/UserContext';
import {Container} from '../components/Container';
import {Input} from '../components/Input';
import {Button} from '../components/Button';

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

        if(email.length === 0) {
            setButtonStatus({...buttonStatus, userAlert: <UserAlert>Por favor, preencha o campo de email</UserAlert>});
            return;
        } else if(password.length < 6) {
            setButtonStatus({...buttonStatus, userAlert: <UserAlert>A senha precisa ter no minimo 6 caracteres</UserAlert>});
            return;
        }
        setButtonStatus({status:<Loader type="ThreeDots" color="#FFFFFF" height={19} width={50}/>, userAlert: "", isDisabled: true});

        const body = user;
        const request = axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, body);

        request.then((r) => {
            setUserProfile(r.data);
            if(checkBox) {
                const loginSaved = JSON.stringify(r.data);
                localStorage.setItem("lastLogin", loginSaved);
            }
            history.push("/home");
        })
        request.catch(() => {
            setButtonStatus({ status:"Entrar", userAlert: <UserAlert>Usuario ou senha invalida</UserAlert>, isDisabled: false});
        })
        setUser({ email: "", password: "" });
    }

    return(
        <Container>
            <h1>MyWallet</h1>
            <FormContainer onSubmit={userLogIn}>
                <Input type="email" placeholder="Email" value={email} required disabled={isDisabled} onChange={e => handleOnChange(e, "email")}/>
                <Input type="password" placeholder="Senha" value={password} required disabled={isDisabled} onChange={e => handleOnChange(e, "password")} />
                <div style={{color: '#FFFFFF'}}><input type="checkbox" onChange={(e) => {checkBox = e.target.checked}}/> manhenha-se conectado</div>
                <Button type="submit">{status}</Button>
            </FormContainer>
            <Link to= "/signup" ><span>Primeira vez? Cadastre-se!</span></Link>
            {userAlert}
        </Container>
    );
}

const FormContainer = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
`;

const UserAlert = styled.div`
    text-align: center;
    font-weight: 700;
    margin-top: 10px;
    color: red;
`;