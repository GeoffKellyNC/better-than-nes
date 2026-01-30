import styled from 'styled-components';
import { theme } from '../styles/theme';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, ${theme.colors.background.secondary} 0%, ${theme.colors.background.tertiary} 100%);
  border-top: 2px solid ${theme.colors.border};
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const FooterTitle = styled.h3`
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.primary};
  margin: 0 0 ${theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FooterText = styled.p`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.relaxed};
  margin: 0;
`;

const FooterLink = styled.a`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.accent.primary};
  text-decoration: none;
  transition: color ${theme.transitions.fast};
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  &:hover {
    color: ${theme.colors.accent.secondary};
  }
`;

const FooterDivider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent, ${theme.colors.border}, transparent);
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-size: ${theme.typography.sizes.xs};
  color: ${theme.colors.text.muted};
  margin: 0;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.sm}) {
    justify-content: center;
  }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background-color: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.sizes.xs};
  color: ${theme.colors.text.secondary};
  border: 1px solid ${theme.colors.border};
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <FooterSection>
            <FooterTitle>About This Site</FooterTitle>
            <FooterText>
              Better Than NES is a community-driven tool built to help Nashville residents
              quickly find power outage information during emergencies.
            </FooterText>
            <Badge>
              <span>⚡</span>
              Open Source Project
            </Badge>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Data Sources</FooterTitle>
            <FooterText>
              Outage data sourced from the official NES API. Updates automatically every 3 minutes.
            </FooterText>
            <FooterLink
              href="https://utilisocial.io/datacapable/v2/p/NES/map/events"
              target="_blank"
              rel="noopener noreferrer"
            >
              NES Outage API →
            </FooterLink>
            <FooterLink
              href="https://nominatim.openstreetmap.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenStreetMap Geocoding →
            </FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Connect</FooterTitle>
            <FooterLink
              href="https://github.com/GeoffKellyNC/better-than-nes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>⭐</span>
              Star on GitHub
            </FooterLink>
            <FooterLink
              href="https://github.com/GeoffKellyNC/better-than-nes/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>🐛</span>
              Report an Issue
            </FooterLink>
            <FooterLink
              href="https://github.com/GeoffKellyNC/better-than-nes/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>📖</span>
              Documentation
            </FooterLink>
          </FooterSection>
        </FooterTop>

        <FooterDivider />

        <FooterBottom>
          <Copyright>
            Built with ❤️ for Nashville • Not affiliated with Nashville Electric Service
          </Copyright>

          <FooterLinks>
            <FooterLink
              href="https://github.com/GeoffKellyNC/better-than-nes/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
            >
              MIT License
            </FooterLink>
            <FooterLink
              href="https://github.com/GeoffKellyNC"
              target="_blank"
              rel="noopener noreferrer"
            >
              @GeoffKellyNC
            </FooterLink>
          </FooterLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};
