import { Link } from '@reach/router';
import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';
import {
  formatDuration,
  formatPeopleAffected,
  formatNumber,
  getStatusColor,
} from '../utils/formatters';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Card = styled(Link)`
  display: block;
  background: linear-gradient(135deg, ${theme.colors.background.secondary} 0%, ${theme.colors.background.tertiary} 100%);
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  transition: all ${theme.transitions.base};
  cursor: pointer;
  text-decoration: none;
  min-height: 140px;
  position: relative;
  overflow: hidden;
  animation: ${slideIn} 0.3s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.$statusColor};
    opacity: 0.8;
  }

  &:hover {
    background: linear-gradient(135deg, ${theme.colors.background.hover} 0%, ${theme.colors.background.tertiary} 100%);
    border-color: ${props => props.$statusColor};
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-2px);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
    min-height: 120px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
  gap: ${theme.spacing.md};
`;

const StatusBadge = styled.span`
  background-color: ${props => props.$color};
  color: white;
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.sizes.xs};
  font-weight: ${theme.typography.weights.bold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  box-shadow: 0 2px 8px ${props => props.$color}40;
`;

const PeopleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${theme.spacing.xs};
`;

const PeopleAffected = styled.div`
  font-size: ${theme.typography.sizes['2xl']};
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.text.primary};
  white-space: nowrap;
  line-height: 1;
`;

const PeopleLabel = styled.span`
  font-size: ${theme.typography.sizes.xs};
  color: ${theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
`;

const LocationSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  background-color: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.md};
  border-left: 3px solid ${theme.colors.accent.primary};
`;

const LocationIcon = styled.span`
  font-size: ${theme.typography.sizes.base};
  line-height: 1;
  margin-top: 2px;
`;

const LocationText = styled.div`
  flex: 1;
`;

const Address = styled.div`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.medium};
  line-height: ${theme.typography.lineHeights.normal};
  margin-bottom: ${theme.spacing.xs};
`;

const IncidentId = styled.div`
  color: ${theme.colors.text.muted};
  font-size: ${theme.typography.sizes.xs};
  font-family: ${theme.typography.fonts.mono};
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.border};
  gap: ${theme.spacing.md};
`;

const TimeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.text.muted};
  font-size: ${theme.typography.sizes.xs};
`;

const TimeIcon = styled.span`
  font-size: ${theme.typography.sizes.sm};
`;

const ViewLink = styled.span`
  color: ${theme.colors.accent.primary};
  font-size: ${theme.typography.sizes.xs};
  font-weight: ${theme.typography.weights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  &::after {
    content: '→';
    transition: transform ${theme.transitions.fast};
  }

  ${Card}:hover &::after {
    transform: translateX(4px);
  }
`;

export const OutageCard = ({ outage, address }) => {
  const statusColor = getStatusColor(outage.status);

  return (
    <Card to={`/outage/${outage.id}`} $statusColor={statusColor}>
      <CardHeader>
        <StatusBadge $color={statusColor}>{outage.status || 'Unknown'}</StatusBadge>
        <PeopleSection>
          <PeopleAffected>{formatNumber(outage.numPeople || 0)}</PeopleAffected>
          <PeopleLabel>Affected</PeopleLabel>
        </PeopleSection>
      </CardHeader>

      <CardBody>
        <LocationSection>
          <LocationIcon>📍</LocationIcon>
          <LocationText>
            <Address>
              {address && address.formatted
                ? address.formatted
                : `${outage.latitude?.toFixed(4)}, ${outage.longitude?.toFixed(4)}`}
            </Address>
            <IncidentId>ID: #{outage.identifier || outage.id}</IncidentId>
          </LocationText>
        </LocationSection>
      </CardBody>

      <CardFooter>
        <TimeInfo>
          <TimeIcon>🕐</TimeIcon>
          <span>{formatDuration(outage.startTime)}</span>
        </TimeInfo>
        <ViewLink>Details</ViewLink>
      </CardFooter>
    </Card>
  );
};
