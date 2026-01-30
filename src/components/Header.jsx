import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';
import { formatTimestamp, formatNumber } from '../utils/formatters';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, ${theme.colors.background.secondary} 0%, ${theme.colors.background.tertiary} 100%);
  border-bottom: 2px solid ${theme.colors.accent.primary};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  position: sticky;
  top: 0;
  z-index: ${theme.zIndex.sticky};
  box-shadow: ${theme.shadows.lg};
  backdrop-filter: blur(10px);

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  }
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const TitleSection = styled.div`
  flex: 1;
  min-width: 200px;
`;

const Title = styled.h1`
  font-size: ${theme.typography.sizes['2xl']};
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.text.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.sizes.xl};
  }
`;

const TitleIcon = styled.span`
  font-size: ${theme.typography.sizes['2xl']};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.sizes.xl};
  }
`;

const Subtitle = styled.p`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.secondary};
  margin: ${theme.spacing.xs} 0 0;
`;

const InfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.sm};
    width: 100%;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
`;

const InfoLabel = styled.span`
  font-size: ${theme.typography.sizes.xs};
  color: ${theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InfoValue = styled.span`
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.primary};
  margin-top: ${theme.spacing.xs};

  @media (max-width: ${theme.breakpoints.sm}) {
    margin-top: 0;
  }
`;

const RefreshButton = styled.button`
  background-color: ${theme.colors.accent.primary};
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.semibold};
  min-height: 44px;
  min-width: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  box-shadow: 0 2px 8px ${theme.colors.accent.primary}40;
  transition: all ${theme.transitions.base};

  &:hover:not(:disabled) {
    background-color: ${theme.colors.accent.secondary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${theme.colors.accent.primary}60;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const RefreshIcon = styled.span`
  display: inline-block;
  animation: ${props => props.$loading ? rotate : 'none'} 1s linear infinite;
`;

const GitHubLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background-color: ${theme.colors.background.tertiary};
  color: ${theme.colors.text.primary};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.semibold};
  min-height: 44px;
  text-decoration: none;
  transition: all ${theme.transitions.base};

  &:hover {
    background-color: ${theme.colors.background.hover};
    border-color: ${theme.colors.accent.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const GitHubIcon = styled.span`
  font-size: ${theme.typography.sizes.lg};
  line-height: 1;
`;

export const Header = ({ totalOutages, lastUpdated, onRefresh, loading }) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <TitleSection>
          <Title>
            <TitleIcon>⚡</TitleIcon>
            Better Than NES
          </Title>
          <Subtitle>Nashville Power Outage Tracker</Subtitle>
        </TitleSection>

        <InfoSection>
          <InfoItem>
            <InfoLabel>Active Outages</InfoLabel>
            <InfoValue>{formatNumber(totalOutages)}</InfoValue>
          </InfoItem>

          {lastUpdated && (
            <InfoItem>
              <InfoLabel>Last Updated</InfoLabel>
              <InfoValue style={{ fontSize: theme.typography.sizes.sm }}>
                {formatTimestamp(lastUpdated)}
              </InfoValue>
            </InfoItem>
          )}

          <GitHubLink
            href="https://github.com/GeoffKellyNC/better-than-nes"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
          >
            <GitHubIcon>⭐</GitHubIcon>
            GitHub
          </GitHubLink>

          <RefreshButton onClick={onRefresh} disabled={loading}>
            <RefreshIcon $loading={loading}>↻</RefreshIcon>
            {loading ? 'Refreshing...' : 'Refresh'}
          </RefreshButton>
        </InfoSection>
      </HeaderContent>
    </HeaderContainer>
  );
};
