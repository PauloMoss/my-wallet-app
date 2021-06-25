import { useState, useContext, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import { IoExitOutline, IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import Loader from "react-loader-spinner";

import UserContext from '../../contexts/UserContext';
import { Header, AllRecords, Record, NewExtract, Button, Date, Balance } from './Styles';
import { logout, ScrollToBottom } from './AuxiliaryFunctions';

export default function Home() {

    const { userProfile, setUserProfile } = useContext(UserContext);
    const[myRecords, setMyRecords] = useState(null);

    const history = useHistory();
    const loading = <Loader type="Oval" color="#6D6D6D" height={40} width={40} />;

    useEffect(() =>{
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` } }
        const request = axios.get('http://localhost:4000/records', config);
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
                <IoExitOutline color={'#FFFFFF'} size={25} onClick={() => logout(userProfile, setUserProfile, history)}/>
            </Header>
            {myRecords ? 
                myRecords.records.length > 0 ?
                    <>
                        <AllRecords records={true}>
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
                            <ScrollToBottom/>
                        </AllRecords>
                        <Balance overall={myRecords.balance.split('-')}>
                            <span>SALDO</span>
                            <div>{myRecords.balance}</div>
                        </Balance>
                    </>
                : <AllRecords records={false}><span>Não há registros de entrada ou saída</span></AllRecords>
            : <AllRecords records={false}>{loading}</AllRecords>} 
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