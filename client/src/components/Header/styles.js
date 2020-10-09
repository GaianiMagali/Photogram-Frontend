import styled from 'styled-components';

export const Nav = styled.header`
  background-color: #fff;
  height: 56px;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 1;
  border-bottom: 1px solid #e6e6e6;
  transition: all 300ms ease-in-out;

  display: flex;
  align-items: center;
`

export const Container = styled.div`
  max-width: 975px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 46px;
`

export const Img = styled.img`
  height: 52px;
`

export const ContainerSearch = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  padding: 8px 4px 8px 2px;
  font: 400 13.333px Arial;
  background-color: #fafafa;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  outline: 0px;
  padding-left: 5px;

  @media (max-width: 500px) {
    display: none;
  }
`

export const Input = styled.input`
  outline: 0px;
  border: none;
  margin-left: 5px;
`

export const ContainerOptions = styled.div`
  color: rgba(0,0,0,0.7);
  text-decoration: none;
  font: 400 24px Arial;
  margin-left: 20px;

  > svg {
    cursor: pointer;
  }

  a {
    margin-right: 14px;
  }
`