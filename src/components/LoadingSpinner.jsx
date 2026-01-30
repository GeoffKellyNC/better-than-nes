import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl};
  min-height: ${props => props.$fullHeight ? '100vh' : '200px'};
`;

const Spinner = styled.div`
  width: ${props => props.$size === 'small' ? '24px' : props.$size === 'large' ? '64px' : '48px'};
  height: ${props => props.$size === 'small' ? '24px' : props.$size === 'large' ? '64px' : '48px'};
  border: 4px solid ${theme.colors.background.tertiary};
  border-top-color: ${theme.colors.accent.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: ${theme.spacing.md};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.sizes.sm};
`;

export const LoadingSpinner = ({ text = 'Loading...', size = 'medium', fullHeight = false }) => {
  return (
    <SpinnerContainer $fullHeight={fullHeight}>
      <Spinner $size={size} />
      {text && <LoadingText>{text}</LoadingText>}
    </SpinnerContainer>
  );
};
