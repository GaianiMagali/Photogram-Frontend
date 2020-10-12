import styled from 'styled-components';

export const Container = styled.div`
  display: flex; 
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  flex-direction: column;
  padding-top: 56px;


  @media (min-width: 1000px) {
    max-width: 900px;
    flex-direction: row;
    padding-top: 100px;
  }
`;

export const Aside = styled.div`
  width: 100%;
  font: 400 14px "Roboto";
  letter-spacing: 0.3px;
  order: -1;

  @media (min-width: 1000px) {
    max-width: 293px;
    height: 80vh;
    position: sticky;
    top: 80px;
    order: 2;
  }
`

export const ContainerOwner = styled.div`
  width: 100%;
  margin-bottom: 20px;
  padding: 0 0 0 4px;

  @media (max-width: 1000px) {
    display: none;
  }
`

export const ContainerFollows = styled.div`
  width: 100%;
  display: flex;
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  padding: 16px 24px;
  font: 400 14px Arial;
  margin-bottom: 20px;
  height: 120px;

  @media (max-width: 640px) {
    margin-bottom: 0;
  }

  @media (min-width: 1000px) {
    background-color: #fff;
    border: 1px solid #e6e6e6;
    padding-bottom: 10px;
    flex-direction: column;
    overflow-y: auto;
    height: 270px;
    ::-webkit-scrollbar {
      background: transparent;
    }
  }

  @media (max-width: 1000px) {
    overflow-y: hidden;
    overflow-x: scroll;
    span {
      font-size: 12px;
    }
    height: 120px;
    ::-webkit-scrollbar {
      background: transparent;
      display: none;
    }
  } 
`
export const ContainerFooter = styled.div`
  width: 100%;
  font-size: 9px;
  color: #999999;

  @media (max-width: 1000px) {
    display: none;
  }
`
export const ContainerFeeds = styled.div`
  flex: 1;
  margin-right: 24px;

  @media (max-width: 1000px) {
    margin-right: 0;
  }
`