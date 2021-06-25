import { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import CurrencyInput from 'react-currency-input'

import { Header } from './Home/Styles';
import { Container, Input, Button } from './Login_SignUp/Styles';
import UserContext from "../contexts/UserContext";

export default function Transfer() {

    const { transferType } = useParams();
    const history = useHistory();
    const { userProfile } = useContext(UserContext)
    const [transferDetail, setTransferDetail] = useState({value: "", description: "", type: ""});
    const { value, description } = transferDetail;

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

        const body = {value: Number(value.replace('.','').replace(',','')), description};
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` } }
        const request = axios.post(`http://localhost:4000/records/${transferType}`, body, config );
        request.then(response => {
            history.push("/home");
        })
    }

    return(
        <>
            <Header>
                Nova {transferDetail.type}
            </Header>
            <Container>
                <form onSubmit={sendTransfer}>
                    <StyledReactInput inputType={"text"} prefix={'R$'} placeholder={"Valor"} value={value} onChange={e => handleOnChange(e.replace("R$",""), "value")} />
                    <Input type="text" placeholder="Descricao" value={description} required onChange={e => handleOnChange(e.target.value, "description")} />
                    <Button type="submit">Salvar {transferDetail.type}</Button>
                </form>
            </Container>
        </>
    );
}

const StyledReactInput = styled(CurrencyInput)`
    width: 303px;
    height: 45px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin: 6px 0;
    color: #000;
    font-size: 15px;
    font-family: Lexend Deca;
`;