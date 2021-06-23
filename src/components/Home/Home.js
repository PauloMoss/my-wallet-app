import { useState, useContext, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import { IoExitOutline, IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

import UserContext from '../../contexts/UserContext';
import { Header, AllRecords, Record, NewExtract, Button, Date, Balance } from './Styles';


export default function Home() {

    const { userProfile, setUserProfile } = useContext(UserContext);
    const[myRecords, setMyRecords] = useState(null);

    const history = useHistory();

    useEffect(() =>{
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` } }
        const request = axios.get('http://localhost:4000/records', config);
        request.then(response =>{
            setMyRecords(response.data);
            console.log(response.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    function logout() {
        localStorage.removeItem("lastLogin");
        setUserProfile("");
        history.push("/");
    }

    return (
        <>
            <Header>
                Olá, {userProfile?.name}
                <IoExitOutline color={'#FFFFFF'} size={25} onClick={logout}/>
            </Header>
            <AllRecords records={myRecords}>
                {myRecords ? 
                    <>
                    {myRecords.records.map((r,i) => {
                        return (
                            <Record key={i} trasferType={r.type} >
                                <div>
                                    <Date>{dayjs(r.date).format('DD/MM')}</Date> {r.description}
                                </div>
                                <div>
                                    {r.value}
                                </div>
                            </Record>
                        )
                    })}
                    <div>
                        <span>SALDO</span>
                        <Balance overall={myRecords.balance.split('-')}>
                            {myRecords.balance}
                        </Balance>
                    </div>
                    </>
                    :'Não há registros de entrada ou saída'
                } 
            </AllRecords>
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