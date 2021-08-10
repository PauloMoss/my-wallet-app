import styled from 'styled-components';

export const Record = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
width: 100%;
margin: 10px 0;
padding: 0 10px;
    div:nth-child(2){
        color:${props => props.trasferType === 'Incomming' ? 'green' : 'red' };
    }
`;