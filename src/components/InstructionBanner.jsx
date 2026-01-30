import styled from 'styled-components';
import { theme } from '../styles/theme';

const BannerContainer = styled.div`
  background: linear-gradient(135deg, ${theme.colors.background.tertiary} 0%, ${theme.colors.background.secondary} 100%);
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin: ${theme.spacing.lg} auto;
  max-width: 1400px;

  @media (max-width: ${theme.breakpoints.md}) {
    margin: ${theme.spacing.md};
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
  }
`;

const BannerTitle = styled.h3`
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.primary};
  margin: 0 0 ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.sizes.base};
  }
`;

const InstructionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
  }
`;

const InstructionItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  background-color: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.md};
  border-left: 3px solid ${props => props.$color || theme.colors.accent.primary};
  transition: all ${theme.transitions.fast};

  &:hover {
    transform: translateX(4px);
    border-left-color: ${theme.colors.accent.secondary};
  }
`;

const InstructionIcon = styled.span`
  font-size: ${theme.typography.sizes.xl};
  line-height: 1;
  flex-shrink: 0;
`;

const InstructionText = styled.div`
  flex: 1;
`;

const InstructionTitle = styled.div`
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const InstructionDescription = styled.p`
  font-size: ${theme.typography.sizes.xs};
  color: ${theme.colors.text.secondary};
  margin: 0;
  line-height: ${theme.typography.lineHeights.normal};
`;

export const InstructionBanner = () => {
  return (
    <BannerContainer>
      <BannerTitle>
        <span>💡</span>
        How to Find Your Outage
      </BannerTitle>

      <InstructionGrid>
        <InstructionItem $color={theme.colors.accent.primary}>
          <InstructionIcon>🔍</InstructionIcon>
          <InstructionText>
            <InstructionTitle>Search by Zip Code</InstructionTitle>
            <InstructionDescription>
              Enter your zip code in the search bar for the fastest way to find outages in your area.
            </InstructionDescription>
          </InstructionText>
        </InstructionItem>

        <InstructionItem $color={theme.colors.accent.secondary}>
          <InstructionIcon>🗺️</InstructionIcon>
          <InstructionText>
            <InstructionTitle>Zoom the Map</InstructionTitle>
            <InstructionDescription>
              Zoom and pan the map to see more detail. Click clustered markers to expand them.
            </InstructionDescription>
          </InstructionText>
        </InstructionItem>

        <InstructionItem $color={theme.colors.accent.warning}>
          <InstructionIcon>👆</InstructionIcon>
          <InstructionText>
            <InstructionTitle>Click for Details</InstructionTitle>
            <InstructionDescription>
              Click any outage card or map marker to view full details including status and affected area.
            </InstructionDescription>
          </InstructionText>
        </InstructionItem>
      </InstructionGrid>
    </BannerContainer>
  );
};
