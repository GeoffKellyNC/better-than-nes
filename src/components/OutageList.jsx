import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { OutageCard } from './OutageCard';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg} ${theme.spacing.md};
  }
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 2px solid ${theme.colors.border};
`;

const ListTitle = styled.h2`
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
`;

const ResultInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${theme.spacing.xs};
`;

const ResultCount = styled.span`
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.accent.primary};
`;

const ResultSubtext = styled.span`
  font-size: ${theme.typography.sizes.xs};
  color: ${theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const LoadMoreSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xl} 0;
`;

const LoadMoreButton = styled.button`
  background: linear-gradient(135deg, ${theme.colors.accent.primary} 0%, ${theme.colors.accent.secondary} 100%);
  color: white;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.semibold};
  min-width: 200px;
  min-height: 48px;
  transition: all ${theme.transitions.base};
  box-shadow: 0 4px 12px ${theme.colors.accent.primary}40;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${theme.colors.accent.primary}60;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const ShowingText = styled.p`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.secondary};
  margin: 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing['3xl']} ${theme.spacing.lg};
  color: ${theme.colors.text.secondary};
  background: linear-gradient(135deg, ${theme.colors.background.secondary} 0%, ${theme.colors.background.tertiary} 100%);
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: ${theme.spacing.lg};
  opacity: 0.5;
`;

const EmptyTitle = styled.h3`
  font-size: ${theme.typography.sizes['2xl']};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`;

const EmptyText = styled.p`
  font-size: ${theme.typography.sizes.base};
  line-height: ${theme.typography.lineHeights.relaxed};
  margin: 0;
  max-width: 500px;
  margin: 0 auto;
`;

const ITEMS_PER_PAGE = 12;

export const OutageList = ({ outages, addresses, title = 'Outages' }) => {
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [outages]);

  const displayedOutages = outages.slice(0, displayCount);
  const hasMore = displayCount < outages.length;

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, outages.length));
  };

  if (outages.length === 0) {
    return (
      <ListContainer>
        <EmptyState>
          <EmptyIcon>🔍</EmptyIcon>
          <EmptyTitle>No outages found</EmptyTitle>
          <EmptyText>
            Try adjusting your search or filter criteria. You can search by zip code, street address, or incident ID.
          </EmptyText>
        </EmptyState>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      <ListHeader>
        <ListTitle>
          <TitleIcon>📋</TitleIcon>
          {title}
        </ListTitle>
        <ResultInfo>
          <ResultCount>{outages.length}</ResultCount>
          <ResultSubtext>{outages.length === 1 ? 'Result' : 'Results'}</ResultSubtext>
        </ResultInfo>
      </ListHeader>

      <Grid>
        {displayedOutages.map((outage) => (
          <OutageCard
            key={outage.id}
            outage={outage}
            address={addresses[outage.id]}
          />
        ))}
      </Grid>

      {hasMore && (
        <LoadMoreSection>
          <ShowingText>
            Showing {displayCount} of {outages.length} outages
          </ShowingText>
          <LoadMoreButton onClick={loadMore}>
            Load More ({Math.min(ITEMS_PER_PAGE, outages.length - displayCount)} more)
          </LoadMoreButton>
        </LoadMoreSection>
      )}

      {!hasMore && outages.length > ITEMS_PER_PAGE && (
        <LoadMoreSection>
          <ShowingText>
            Showing all {outages.length} outages
          </ShowingText>
        </LoadMoreSection>
      )}
    </ListContainer>
  );
};
