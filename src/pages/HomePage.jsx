import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { useOutages } from '../hooks/useOutages';
import { useGeocoding } from '../hooks/useGeocoding';
import { applyFilters } from '../utils/filters';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { FilterControls } from '../components/FilterControls';
import { OutageMap } from '../components/OutageMap';
import { OutageList } from '../components/OutageList';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { StatsDashboard } from '../components/StatsDashboard';
import { InstructionBanner } from '../components/InstructionBanner';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.background.primary};
`;

const ContentContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ControlsSection = styled.section`
  background-color: ${theme.colors.background.secondary};
  border-bottom: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  align-items: center;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
  }
`;

const MapSection = styled.section`
  background-color: ${theme.colors.background.primary};
  padding: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0;
  }
`;

const StatsSection = styled.section`
  background-color: ${theme.colors.background.primary};
  border-bottom: 1px solid ${theme.colors.border};
`;

const SectionDivider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent, ${theme.colors.border}, transparent);
  margin: ${theme.spacing.xl} 0;
`;

const ErrorContainer = styled.div`
  padding: ${theme.spacing.xl};
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const ErrorTitle = styled.h2`
  font-size: ${theme.typography.sizes['2xl']};
  color: ${theme.colors.status.unassigned};
  margin-bottom: ${theme.spacing.md};
`;

const ErrorText = styled.p`
  font-size: ${theme.typography.sizes.base};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.relaxed};
  margin-bottom: ${theme.spacing.lg};
`;

const RetryButton = styled.button`
  background-color: ${theme.colors.accent.primary};
  color: white;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.medium};

  &:hover {
    background-color: ${theme.colors.accent.secondary};
  }
`;

export const HomePage = () => {
  const { outages, loading, error, refetch, lastUpdated } = useOutages();
  const { addresses, getAddress } = useGeocoding(outages);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('most-affected');

  const filteredOutages = useMemo(() => {
    return applyFilters(
      outages,
      { query: searchQuery, status: statusFilter, sortBy },
      addresses
    );
  }, [outages, searchQuery, statusFilter, sortBy, addresses]);

  if (loading && outages.length === 0) {
    return (
      <PageContainer>
        <LoadingSpinner text="Loading outage data..." fullHeight />
      </PageContainer>
    );
  }

  if (error && outages.length === 0) {
    return (
      <PageContainer>
        <Header
          totalOutages={0}
          lastUpdated={lastUpdated}
          onRefresh={refetch}
          loading={loading}
        />
        <ErrorContainer>
          <ErrorTitle>Unable to Load Outage Data</ErrorTitle>
          <ErrorText>
            We're having trouble connecting to the NES outage system. This might be due to high
            traffic or a temporary issue. Please try again.
          </ErrorText>
          <ErrorText style={{ fontSize: theme.typography.sizes.sm, color: theme.colors.text.muted }}>
            Error: {error}
          </ErrorText>
          <RetryButton onClick={refetch}>Retry</RetryButton>
        </ErrorContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header
        totalOutages={outages.length}
        lastUpdated={lastUpdated}
        onRefresh={refetch}
        loading={loading}
      />

      <ContentContainer>
        <StatsSection>
          <StatsDashboard outages={outages} />
        </StatsSection>

        <InstructionBanner />

        <ControlsSection>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterControls
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </ControlsSection>

        <MapSection>
          <OutageMap
            outages={filteredOutages}
            addresses={addresses}
            height="500px"
            mobileHeight="400px"
          />
        </MapSection>

        <OutageList
          outages={filteredOutages}
          addresses={addresses}
          title={searchQuery ? 'Search Results' : 'All Outages'}
        />
      </ContentContainer>
    </PageContainer>
  );
};
