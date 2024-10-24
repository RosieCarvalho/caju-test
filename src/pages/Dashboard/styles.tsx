import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

export const Loadding = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  top: 0px;
  left: 0px;
  z-index: 1000;
  align-items: center;
  justify-content: center;
`;
