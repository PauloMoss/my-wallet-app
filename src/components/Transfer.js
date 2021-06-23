import { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';

import { Header } from './Home/Styles';
import { Container, Input, Button, UserAlert } from './Login_SignUp/Styles';
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
    },[])

    function handleOnChange(e, objKey) {
        setTransferDetail({...transferDetail, [objKey]: e.target.value})
    }

    function sendTransfer(event) {
        event.preventDefault();

        const body = {value, description};
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
                    <Input type="number" placeholder="Valor" value={value} required onChange={e => handleOnChange(e, "value")}/>
                    <Input type="text" placeholder="Descricao" value={description} required onChange={e => handleOnChange(e, "description")} />
                    <Button type="submit">Salvar {transferDetail.type}</Button>
                </form>
            </Container>
        </>
    );
}