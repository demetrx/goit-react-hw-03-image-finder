import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const ModalStyled = styled.div`
  max-width: 70%;
  max-height: 90%;
  overflow: hidden;

  & img {
    width: 100%;
    object-fit: cover;
  }
`;
