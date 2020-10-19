import styled from 'styled-components';


export const Container = styled.div`
  max-width: 900px;
  max-height: 600px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  margin-top: 100px;
`;

export const ContainerLeft = styled.div`
  max-width: 200px;
  max-height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  border-right: 1px solid #e6e6e6;

  > ul {
    list-style-type: none;
    margin-top: 1.5em;
    font-weight: bold;
  }

  && li a {
    text-decoration: none;
    color: #262626;
    font-weight:600;
  }
`;

export const ContainerRight = styled.div`
  max-width: 600px;
  max-height: 100%;
  width: 100%;
  display: block;
`;

export const ContainerRightHeader = styled.div`
    display: flex;
    padding-top: 32px;
    > img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        margin-left: 130px;
        cursor: pointer;
    }
    h1 {
        font-size: 20px;
        line-height: 22px;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 30px;
        cursor: pointer;
    }
    span {
        font-size: 14px;
        font-weight: bold;
        color: #0095f6;
        cursor: pointer;
        margin-left: 30px;
    }
`;

export const ContainerRightForm = styled.div`

    > form {
        margin-left: 110px;
        margin-top: 20px;
    }

    && div { 
        margin-bottom: 40px;
    }

    input{
        padding: 5px;
    }
    
    span {
        color: 262626;
        font-size: 16px;
        font-weight: 600;
        line-height: 18px;
        margin-right: 20px
    }

    .help-input {
        font-size: 12px; 
        line-height: 14px;
        color: #8e8e8e;
        margin-top: 10px;
        font-weight: 400;
    }

    .form-button{
        display: flex;
        justify-content: space-between;
    }

    button {
        background-color: #0095f6;
        color: #fff;
        border: 1px solid transparent;
        border-radius: 4px;
        box-sizing: border-box;
        cursor: pointer;
        display: block;
        font-weight: 600;
        padding: 5px 9px;
        text-align: center;
    }

`