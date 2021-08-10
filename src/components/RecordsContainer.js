import styled from 'styled-components';
import dayjs from 'dayjs';
import Loader from "react-loader-spinner";

import { Record } from './Record';
import ScrollToBottom from './ScrollToBottom';

export default function RecordsContainer({myRecords}) {

    const loading = <Loader type="Oval" color="#6D6D6D" height={40} width={40} />;

    return(
        <>
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
        </>
    );
}

const AllRecords = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: ${props => props.records ? 'flex-start' : 'center'};
    align-items: center;
    position: relative;
    height: calc(100vh - 78px - 143px);
    background: #FFFFFF;
    border-radius: 5px;
    margin: 0 25px;
    padding: 20px 0 50px 0;
    overflow: scroll;
    -ms-overflow-style: none;
        &::-webkit-scrollbar {
            display: none;
        }
        & > span {
            color: #868686;
            font-size: 17px;
        }
`;

const Date = styled.span`
margin: 0 5px;
color: #C6C6C6;
`;

const Balance = styled.div`
    display: flex;
    justify-content: space-between;
    align-items:center;
    height:50px;
    position: fixed;
    bottom: 143px;
    left: 25px;
    right:25px;
    border-radius: 5px;
    z-index:1;
    padding: 0 15px;
    background-color: #fff;
    span {
        font-weight: 700;
    }
    div {
        color: ${props => props.overall.length === 1 ? 'green' : 'red'};
    }
`;