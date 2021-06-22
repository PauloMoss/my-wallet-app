import styled from 'styled-components';

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 78px;
    margin: 0 25px;
`;

const Records = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 78px - 143px);
    background: #FFFFFF;
    border-radius: 5px;
    margin: 0 25px;
`;

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
    width: 155px;
    height: 114px;
    background: #A328D6;
    border-radius: 5px;
    border: none;
    padding: 20px 10px;
        p {
            color: #FFF;
            font-size: 17px;
        }
`;

export { Header, Records, NewExtract, Button };