import styled from 'styled-components';


export const Input = styled.input`
width: 303px;
height: 45px;
border: 1px solid #D5D5D5;
border-radius: 5px;
margin: 6px 0;
font-size: 15px;
color: #000;
background-color: ${props => props.disabled ? '#F2F2F2' : '#FFFFFF'};
font-family: 'arial';
display: block;
::placeholder {
    color: #000;
    opacity: 0.5
}
`;