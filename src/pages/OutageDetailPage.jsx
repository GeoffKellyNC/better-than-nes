import { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { useOutages } from '../hooks/useOutages';
import { useGeocoding } from '../hooks/useGeocoding';
import { Header } from '../components/Header';
import { OutageDetail } from '../components/OutageDetail';
import { OutageMap } from '../components/OutageMap';
import { LoadingSpinner } from '../components/LoadingSpinner';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.background.primary};
`;

const ContentContainer = styled.main`
  flex: 1;
  padding: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background-color: ${theme.colors.background.tertiary};
  color: ${theme.colors.text.primary};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.medium};
  margin-bottom: ${theme.spacing.xl};
  transition: all ${theme.transitions.fast};
  text-decoration: none;
  border: 1px solid ${theme.colors.border};

  &:hover {
    background-color: ${theme.colors.background.hover};
    border-color: ${theme.colors.accent.primary};
  }

  &::before {
    content: '←';
    font-size: ${theme.typography.sizes.lg};
  }
`;

const MapContainer = styled.div`
  margin: ${theme.spacing.xl} 0;

  @media (max-width: ${theme.breakpoints.md}) {
    margin: ${theme.spacing.lg} -${theme.spacing.md};
  }
`;

const NotFoundContainer = styled.div`
  text-align: center;
  padding: ${theme.spacing['3xl']};
`;

const NotFoundTitle = styled.h2`
  font-size: ${theme.typography.sizes['2xl']};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`;

const NotFoundText = styled.p`
  font-size: ${theme.typography.sizes.base};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xl};
`;

export const OutageDetailPage = ({ outageId }) => {
  const { outages, loading, refetch, lastUpdated } = useOutages();
  const [outage, setOutage] = useState(null);
  const { addresses, getAddress, geocodeOutages } = useGeocoding();

  useEffect(() => {
    if (outages.length > 0 && outageId) {
      const found = outages.find(o => o.id.toString() === outageId.toString());
      setOutage(found || null);

      if (found && !addresses[found.id]) {
        geocodeOutages([found]);
      }
    }
  }, [outages, outageId, addresses, geocodeOutages]);

  if (loading && !outage) {
    return (
      <PageContainer>
        <LoadingSpinner text="Loading outage details..." fullHeight />
      </PageContainer>
    );
  }

  if (!outage && !loading) {
    return (
      <PageContainer>
        <Header
          totalOutages={outages.length}
          lastUpdated={lastUpdated}
          onRefresh={refetch}
          loading={loading}
        />
        <ContentContainer>
          <BackButton to="/">Back to All Outages</BackButton>
          <NotFoundContainer>
            <NotFoundTitle>Outage Not Found</NotFoundTitle>
            <NotFoundText>
              The outage you're looking for doesn't exist or may have been resolved.
            </NotFoundText>
            <NotFoundText>
              Outage ID: {outageId}
            </NotFoundText>
          </NotFoundContainer>
        </ContentContainer>
      </PageContainer>
    );
  }

  const address = outage ? getAddress(outage.id) : null;

  return (
    <PageContainer>
      <Header
        totalOutages={outages.length}
        lastUpdated={lastUpdated}
        onRefresh={refetch}
        loading={loading}
      />

      <ContentContainer>
        <BackButton to="/">Back to All Outages</BackButton>

        {outage && <OutageDetail outage={outage} address={address} />}

        <MapContainer>
          <OutageMap
            outages={outage ? [outage] : []}
            addresses={addresses}
            height="400px"
            mobileHeight="300px"
            center={outage ? [outage.latitude, outage.longitude] : undefined}
            zoom={14}
          />
        </MapContainer>
      </ContentContainer>
    </PageContainer>
  );
};
