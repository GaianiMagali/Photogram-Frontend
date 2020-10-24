import styled from 'styled-components';

import { Form as UnformWeb } from '@unform/web';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 450px){
    align-items: flex-start
  }
`

export const FromContainer = styled.div`
  width: 100%;
  height: auto;

  @media (min-width: 450px) {
    max-width: 350px;
  }
`

export const Form = styled(UnformWeb)`
  background-color: #fff;
  width: 100%;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > img {
    width: 230px;
  }

  hr {
    width: 100%;
    color: #e6e6e6;
    margin: 10px 0 ;
  }

  p{
    color: #262626;
    font: bold 15px "Roboto" ;
    margin-top:10px;
    margin-right: 140px;
  }

  input{
    width: 100%;
    margin-bottom: 7px;
    margin-top: 5px;
    padding:10px 8px;
    font: 400 13.333 Arial;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
  }

  button {
    width: 100%;
    padding: 9px 9px;
    background-color: #3897f0;
    border: 1px solid #3897f0;
    border-radius: 4px;
    margin-top: 8px;
    font: bold 13.333px Arial;
    color: #fff;
    cursor: pointer;
    outline: 0px;

    &:hover {
      background-color: #38ff;
    }
  }

  @media (max-width: 450px) {
    background: transparent;
    border: 0;
  }
`