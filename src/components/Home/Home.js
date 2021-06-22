import axios from 'axios';
import { useState, useEffect } from 'react'
import { Header, Records, NewExtract, Button } from './Styles';
import { IoExitOutline, IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

export default function Home() {

    const [userProfile, setUserProfile] = useState(null);

    useEffect(() =>{
        const request = axios.get('http://localhost:4000/clients');
        request.then(response =>{
            setUserProfile(response.data[0].name)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <>
            <Header>
                Olá, {userProfile}
                <IoExitOutline color={'#FFFFFF'} size={25}/>
            </Header>
            <Records> Não há registros de entrada ou saída </Records>
            <NewExtract>
                <Button>
                    <IoAddCircleOutline color={'#FFFFFF'} size={25}/>
                    <p>Nova <br/>entrada</p>
                </Button>
                <Button>
                    <IoRemoveCircleOutline color={'#FFFFFF'} size={25}/>
                    <p>Nova <br/>saída</p>
                </Button>
            </NewExtract>
        </>
    );
}