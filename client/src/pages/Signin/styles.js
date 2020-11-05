import styled, { keyframes } from 'styled-components';

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

const scalecheck = keyframes`
  0 % {
    transform: scale(0);
  }
  90 % {
    transform: scale(1.4);
  }
  100 % {
    transform: scale(1);
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

  > img {
    width: 230px;
  }

  @media (max-width: 450px) {
    background: transparent;
    border: 0;
  }

  hr {
    width: 100%;
    color: #e6e6e6;
    margin: 20px 10px ;
   

  }

  span {
    text-align: center;
    color: #7f7f7f;
    font-size: 20px;
    margin: 15px;

    &.footer{
      font-size: 12px;
    }

    & a{
      text-decoration: none;
      color: #00376b;
  }
  }

  
  button {
    width: 100%;
    padding: 9px 9px;
    background-color: #3897f0;
    border: 1px solid #3897f0;
    border-radius: 4px;
    margin-top: 20px;
    font: bold 13.333px Arial;
    color: #fff;
    cursor: pointer;
    outline: 0px;

    &:hover {
      background-color: #38ff;
    }
  }

  .divider{
    overflow: hidden;
    text-align: center;
    justify-content: center;
    box-sizing: border-box;
    color:rgb(165, 164, 164);
    font-size: 13.5px;
    font-weight: 500;
    // top,right,button,left
    margin: 20px 0 0 5px;
    width: 300px;
  }

  .divider:before,
  .divider:after {
  background-color: rgb(224, 221, 221);
  content: "";
  display: inline-block;
  height: 1.2px;
  position: relative;
  vertical-align: middle;
  width: 50%;
}

.divider:before {
  right: 2em;
  margin-left: -50%;
}

.divider:after {
  left: 2em;
  margin-right: -50%;
}

  label{
    padding-right:149px;
    padding-top:2px;
    content: "\f096";
	  font-size: inherit;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
    input{
      content: \f14a;
      color: #1061ee;
      animation: ${scalecheck} 0.1s; 
      cursor: pointer;
    }

    span{
      margin: 5px;
      color: #333;
      cursor: pointer;
      font-size: 11px
    }
  
  }
`

export const Footer = styled.div`
  background-color: #fff;
  width: 100%;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  padding: 20px 40px;
  margin-top: 10px;
  display: flex;
  justify-content: center;

  @media (max-width: 450px){
    background: transparent;
    border: 0;
  }

  p{
    color: #999;
    font-size: 15px;

    a {
      color: #3897f0;
      text-decoration: none;
    }
  }
`