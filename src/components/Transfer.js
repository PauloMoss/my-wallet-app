import { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import CurrencyInput from 'react-currency-input'
import Loader from "react-loader-spinner";

import { Header } from './Home/Styles';
import { Container, Input, Button, UserAlert } from './Login_SignUp/Styles';
import UserContext from "../contexts/UserContext";

export default function Transfer() {

    const { transferType } = useParams();
    const history = useHistory();
    const { userProfile } = useContext(UserContext)
    const [transferDetail, setTransferDetail] = useState({value: null, description: "", type: ""});
    const { value, description } = transferDetail;
    const [buttonStatus, setButtonStatus] = useState({ userAlert: "", isDisabled: false });
    const { userAlert, isDisabled } = buttonStatus;

    useEffect(()=>{
        if(transferType === "In") {
            setTransferDetail({...transferDetail, type: "Entrada"});
        } else if (transferType === "Out") {
            setTransferDetail({...transferDetail, type: "Saida"});
        }
        // eslint-disable-next-line
    },[])

    function handleOnChange(e, objKey) {
        setTransferDetail({...transferDetail, [objKey]: e})
    }
    
    function sendTransfer(event) {
        event.preventDefault();

        if(!value) {
            setButtonStatus({...buttonStatus, userAlert: <UserAlert>Por favor, preencha o valor</UserAlert>});
            return;
        }
        setButtonStatus({status:<Loader type="ThreeDots" color="#FFFFFF" height={19} width={50}/>, userAlert: "", isDisabled: true});
        
        const body = {value: Number(value.replace('.','').replace(',','')), description};
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` } }
        const request = axios.post(`http://localhost:4000/records/${transferType}`, body, config );
        request.then(() => {
            history.push("/home");
        });
        request.catch(erro => {
            setButtonStatus({ status:"Entrar", userAlert: <UserAlert>Ocorreu um erro, por favor tente novamente</UserAlert>, isDisabled: false});
        });
    }

    return(
        <>
            <Header>
                Nova {transferDetail.type}
            </Header>
            <Container>
                <form onSubmit={sendTransfer}>
                    <StyledReactInput inputType={"text"} disabled={isDisabled} prefix={'R$'} placeholder={"Valor"} allowEmpty={true} value={value} onChange={e => handleOnChange(e.replace("R$",""), "value")} />
                    <Input type="text" placeholder="Descricao" value={description} disabled={isDisabled} onChange={e => handleOnChange(e.target.value, "description")} />
                    <Button type="submit">{`Salvar ${transferDetail.type}`}</Button>
                </form>
                {userAlert}
            </Container>
        </>
    );
}

const StyledReactInput = styled(CurrencyInput)`
    width: 303px;
    height: 45px;
    background-color: ${props => props.disabled ? '#F2F2F2' : '#FFFFFF'};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin: 6px 0;
    color: #000;
    font-size: 15px;
    font-family: Lexend Deca;
    ::placeholder {
        color: #000;
        opacity: 0.5
    }
`;