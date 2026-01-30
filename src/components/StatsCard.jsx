import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Card = styled.div`
  background: linear-gradient(135deg, ${theme.colors.background.secondary} 0%, ${theme.colors.background.tertiary} 100%);
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.4s ease-out;
  animation-delay: ${props => props.$delay || '0s'};
  animation-fill-mode: both;
  transition: all ${theme.transitions.base};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
    border-color: ${props => props.$accentColor || theme.colors.accent.primary};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.$accentColor || theme.colors.accent.primary};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
  }
`;

const Label = styled.span`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: ${theme.typography.weights.medium};
`;

const Value = styled.div`
  font-size: ${theme.typography.sizes['3xl']};
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.text.primary};
  line-height: 1;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.sizes['2xl']};
  }
`;

const Subtitle = styled.span`
  font-size: ${theme.typography.sizes.xs};
  color: ${theme.colors.text.secondary};
  margin-top: ${theme.spacing.xs};
`;

const Icon = styled.div`
  font-size: ${theme.typography.sizes['2xl']};
  margin-bottom: ${theme.spacing.xs};
`;

export const StatsCard = ({ label, value, subtitle, icon, accentColor, delay }) => {
  return (
    <Card $accentColor={accentColor} $delay={delay}>
      {icon && <Icon>{icon}</Icon>}
      <Label>{label}</Label>
      <Value>{value}</Value>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Card>
  );
};
