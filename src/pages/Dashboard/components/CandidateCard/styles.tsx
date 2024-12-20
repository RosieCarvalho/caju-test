import styled, { keyframes } from 'styled-components';

const animationCard = keyframes`
	0% {
		opacity: 0;
		transform: translateX(40px);
	}

	100% {
		opacity: 1;
		transform: translateX(0);
	}
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${animationCard} 1s ease 0s 1 normal forwards;
  gap: 4px;
  border: 4px solid #fff;
  margin: 16px;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  h3,
  p {
    margin: 0;
  }
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

export const IconAndText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Actions = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;

  svg {
    cursor: pointer;
  }
`;

export const ButtonToast = styled.div`
  display: 'flex';
  gap: 5;
`;

export const CustonToast = styled.div`
  margin: 10;
`;
