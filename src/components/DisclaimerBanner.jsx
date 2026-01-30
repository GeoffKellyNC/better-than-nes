import styled from 'styled-components';
import { theme } from '../styles/theme';

const BannerContainer = styled.div`
  background: linear-gradient(135deg, ${theme.colors.status.warning}15 0%, ${theme.colors.status.unassigned}15 100%);
  border: 1px solid ${theme.colors.status.warning};
  border-left: 4px solid ${theme.colors.status.warning};
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

const BannerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
`;

const BannerIcon = styled.span`
  font-size: ${theme.typography.sizes['2xl']};
  line-height: 1;
`;

const BannerTitle = styled.h3`
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.text.primary};
  margin: 0;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.sizes.base};
  }
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const BannerText = styled.p`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.relaxed};
  margin: 0;

  strong {
    color: ${theme.colors.text.primary};
    font-weight: ${theme.typography.weights.semibold};
  }
`;

const BannerNote = styled.div`
  margin-top: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.sizes.xs};
  color: ${theme.colors.text.muted};
  font-style: italic;
`;

export const DisclaimerBanner = () => {
  return (
    <BannerContainer>
      <BannerHeader>
        <BannerIcon>⚠️</BannerIcon>
        <BannerTitle>Important Notice About Status Updates</BannerTitle>
      </BannerHeader>

      <BannerContent>
        <BannerText>
          <strong>Due to the scale of this emergency</strong>, NES is utilizing crews from outside their service area, including third-party contractors and assistance from other states.
        </BannerText>

        <BannerText>
          The <strong>"Assigned" and "Unassigned"</strong> status indicators shown here may not accurately reflect work being performed by external crews or third-party assistance. Many outages may be actively worked on even if they appear "Unassigned" in the system.
        </BannerText>

        <BannerNote>
          This tracker displays real-time data directly from the NES outage API. Status updates reflect NES's internal system and may lag behind actual restoration efforts.
        </BannerNote>
      </BannerContent>
    </BannerContainer>
  );
};
