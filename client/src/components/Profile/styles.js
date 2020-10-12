import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: ${props => props.direction};
  align-items: ${props => (props.direction === "row" ? "center" : "")};
  justify-content: ${props => (props.direction === "column" ? "center" : "")};

  line-height: 20px;

  a {
    text-decoration: none;
  }

  @media (min-width: 1000px) {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: ${props => (props.usidebar ? "10px" : "")};
  }

  @media (max-width: 1000px) {
    margin-right: ${props => (props.usidebar ? "10px" : "")};
    justify-content: center;
    align-items: center;
  }

  div {
    display: flex;
    flex-direction: column;
  }
`;

export const Img = styled.img`
  border-radius: 50%;
  width: ${props => (props.usidebar || props.isOwner ? "56px" : "30px")};
  height: ${props => (props.usidebar || props.isOwner ? "56px" : "30px")};
  background: url(${props => props.src});
  background-position: center;
  background-size: cover;


  margin-right: 16px;

  @media (min-width: 1000px) {
    width: ${props => props.usidebar && "30px"};
    height: ${props => props.usidebar && "30px"};
  }

  @media (max-width: 1000px) {
    margin-right: ${props => (props.usidebar ? "0" : "16px")};
  }
`;

export const Username = styled.p`
  font: bold 13.5px "Roboto";
  color: #2c2c2c;
  letter-spacing: 0.4px;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 200px;

  @media (max-width: 1000px) {
    font: ${props => (props.usidebar ? "normal 13.5px Roboto" : "")};
    width: 100px;
    text-align: center;
  }
`;

export const Name = styled.p`
  color: #2c2c2c;
  letter-spacing: 0.4px;

  @media (max-width: 1000px) {
    display: none;
  }
`;