import styled from 'styled-components';

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 80%;
margin: 0 auto;

        h1 {
            margin-top: 160px;
            margin-bottom: 40px;
            color:#FFFFFF;
            font-size: 32px;
            font-family: 'Saira Stencil One', cursive;
        }
        button {
            margin-top: 10px;
            margin-bottom: 25px;
            border: none;
        }
        span {
            color:#FFFFFF;
        }
        div {
            font-size: 14px;
        }
`;

const Input = styled.input`
    width: 303px;
    height: 45px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin: 6px 0;
    background-color: ${props => props.disabled ? '#F2F2F2' : '#FFFFFF'};
    font-family: Lexend Deca;
`;

const Button = styled.button`
    width: 303px;
    height: 45px;
    background: #A328D6;
    border-radius: 5px;
    color: #FFFFFF;
    font-size: 20px;
`;
const UserAlert = styled.div`
    margin-top: 10px;
    color: #ff0000;
`;

export {Container, Input, Button, UserAlert};