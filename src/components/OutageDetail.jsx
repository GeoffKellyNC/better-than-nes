import styled from 'styled-components';
import { theme } from '../styles/theme';
import {
  formatTimestamp,
  formatPeopleAffected,
  formatDuration,
  getStatusColor,
} from '../utils/formatters';

const DetailContainer = styled.div`
  background-color: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg};
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
`;

const DetailHeader = styled.div`
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 2px solid ${theme.colors.border};
`;

const StatusBadge = styled.span`
  display: inline-block;
  background-color: ${props => props.$color};
  color: white;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${theme.spacing.md};
`;

const PeopleCount = styled.h2`
  font-size: ${theme.typography.sizes['3xl']};
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.text.primary};
  margin: ${theme.spacing.md} 0;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.sizes['2xl']};
  }
`;

const Subtitle = styled.p`
  font-size: ${theme.typography.sizes.base};
  color: ${theme.colors.text.secondary};
  margin: 0;
`;

const DetailSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const SectionTitle = styled.h3`
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const InfoLabel = styled.span`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: ${theme.typography.weights.medium};
`;

const InfoValue = styled.span`
  font-size: ${theme.typography.sizes.base};
  color: ${theme.colors.text.primary};
  font-weight: ${theme.typography.weights.medium};
`;

const AddressBlock = styled.div`
  background-color: ${theme.colors.background.tertiary};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  border-left: 4px solid ${theme.colors.accent.primary};
`;

const AddressText = styled.p`
  font-size: ${theme.typography.sizes.lg};
  color: ${theme.colors.text.primary};
  margin: 0;
  line-height: ${theme.typography.lineHeights.relaxed};
`;

const CoordinatesText = styled.p`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.muted};
  margin: ${theme.spacing.sm} 0 0;
  font-family: ${theme.typography.fonts.mono};
`;

export const OutageDetail = ({ outage, address }) => {
  const statusColor = getStatusColor(outage.status);

  return (
    <DetailContainer>
      <DetailHeader>
        <StatusBadge $color={statusColor}>{outage.status || 'Unknown'}</StatusBadge>
        <PeopleCount>{formatPeopleAffected(outage.numPeople)}</PeopleCount>
        <Subtitle>are currently without power</Subtitle>
      </DetailHeader>

      <DetailSection>
        <SectionTitle>Location</SectionTitle>
        {address && address.formatted ? (
          <AddressBlock>
            <AddressText>{address.formatted}</AddressText>
            {address.neighborhood && (
              <AddressText style={{ fontSize: theme.typography.sizes.base, marginTop: theme.spacing.xs }}>
                {address.neighborhood}
              </AddressText>
            )}
            <CoordinatesText>
              {outage.latitude?.toFixed(5)}, {outage.longitude?.toFixed(5)}
            </CoordinatesText>
          </AddressBlock>
        ) : (
          <AddressBlock>
            <AddressText>Nashville, TN</AddressText>
            <CoordinatesText>
              {outage.latitude?.toFixed(5)}, {outage.longitude?.toFixed(5)}
            </CoordinatesText>
          </AddressBlock>
        )}
      </DetailSection>

      <DetailSection>
        <SectionTitle>Outage Information</SectionTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Incident ID</InfoLabel>
            <InfoValue>#{outage.identifier || outage.id}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Status</InfoLabel>
            <InfoValue>{outage.status || 'Unknown'}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Started</InfoLabel>
            <InfoValue>{formatTimestamp(outage.startTime)}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Duration</InfoLabel>
            <InfoValue>{formatDuration(outage.startTime)}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Last Updated</InfoLabel>
            <InfoValue>{formatTimestamp(outage.lastUpdatedTime)}</InfoValue>
          </InfoItem>

          {outage.cause && (
            <InfoItem>
              <InfoLabel>Cause</InfoLabel>
              <InfoValue>{outage.cause}</InfoValue>
            </InfoItem>
          )}
        </InfoGrid>
      </DetailSection>

      {address && (address.street || address.zip) && (
        <DetailSection>
          <SectionTitle>Address Details</SectionTitle>
          <InfoGrid>
            {address.street && (
              <InfoItem>
                <InfoLabel>Street</InfoLabel>
                <InfoValue>{address.street}</InfoValue>
              </InfoItem>
            )}

            {address.city && (
              <InfoItem>
                <InfoLabel>City</InfoLabel>
                <InfoValue>{address.city}</InfoValue>
              </InfoItem>
            )}

            {address.zip && (
              <InfoItem>
                <InfoLabel>Zip Code</InfoLabel>
                <InfoValue>{address.zip}</InfoValue>
              </InfoItem>
            )}

            {address.state && (
              <InfoItem>
                <InfoLabel>State</InfoLabel>
                <InfoValue>{address.state}</InfoValue>
              </InfoItem>
            )}
          </InfoGrid>
        </DetailSection>
      )}
    </DetailContainer>
  );
};
