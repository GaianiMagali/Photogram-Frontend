import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  max-height: 700px;
  width: 100%;
  height: 100%;
  padding-top: 100px;
  margin: 0 auto;
  display: flex;
`;


export const ContainerPhoto = styled.div`
  background-color: #f6f6f6;
  width: 100%;
  max-width: 600px;
  max-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;

  object-fit: contain;
  object-position: center;
`;

export const ContainerPost = styled.div`
  width: 100%;
  max-width: 300px;
  background: #fff;
`;

export const HeaderPost = styled.div`
  padding: 10px 16px;
  font: 400 14px "Roboto";
  border-bottom: 1px solid #e6e6e6;

`;

export const ContainerComments = styled(HeaderPost)`
  max-height: 400px;
  min-height: 400px;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-track {
    background-color: #fff;
  }
`;

export const TimeStyle = styled.span`
  color: #999999;
  font-size: 8px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  position: "absolute";
  display:"block";
`;

export const ContainerOptions = styled(HeaderPost)`
   position: relative;
   align-items: ${props => (props.direction === "row" ? "center" : "")};
  display: "inline-block"
`;
