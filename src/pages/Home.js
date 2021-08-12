import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import styled from 'styled-components';

import UserContext from '../contexts/UserContext';
import RecordsContainer from '../components/RecordsContainer'
import { Header } from '../components/Header';
import Logout from '../components/Logout';

export default function Home() {

    const { userProfile, setUserProfile } = useContext(UserContext);
    const[myRecords, setMyRecords] = useState(null);

    useEffect(() =>{
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` } }
        const request = axios.get(`${process.env.REACT_APP_API_BASE_URL}/records`, config);
        request.then(response =>{
            setMyRecords(response.data);
        }).catch(err => {
            console.log(err)
        })
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Header>
                Olá, {userProfile?.name}
                <Logout userProfile={userProfile} setUserProfile={setUserProfile} />
            </Header>

            <RecordsContainer myRecords={myRecords}/> 

            <NewExtract>
                <Link to="/transfer/In">
                    <Button>
                        <IoAddCircleOutline color={'#FFFFFF'} size={25}/>
                        <p>Nova <br/>entrada</p>
                    </Button>
                </Link>
                <Link to="/transfer/Out">
                    <Button>
                        <IoRemoveCircleOutline color={'#FFFFFF'} size={25}/>
                        <p>Nova <br/>saída</p>
                    </Button>
                </Link>
            </NewExtract>
        </>
    );
}

const NewExtract = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 143px;
    margin: 0 25px;
    padding: 15px 0;
`;

const Button = styled.button`
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    width: 40vw;
    height: 114px;
    background: #A328D6;
    border-radius: 5px;
    border: none;
    padding: 20px 10px;
        p {
            color: #FFF;
            font-size: 15px;
            text-align:start;
        }
`;