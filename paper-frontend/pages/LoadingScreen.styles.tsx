import styled from 'styled-components';

export const LoadingScreenContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(255,255,255,0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000000 !important;
  position: absolute;
  top: 0;
`