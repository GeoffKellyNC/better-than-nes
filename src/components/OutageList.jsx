import styled from 'styled-components';
import { theme } from '../styles/theme';
import { OutageCard } from './OutageCard';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
  }
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
`;

const ListTitle = styled.h2`
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.primary};
  margin: 0;
`;

const ResultCount = styled.span`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.secondary};
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

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing['3xl']} ${theme.spacing.lg};
  color: ${theme.colors.text.secondary};
`;

const EmptyTitle = styled.h3`
  font-size: ${theme.typography.sizes.xl};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`;

const EmptyText = styled.p`
  font-size: ${theme.typography.sizes.base};
  line-height: ${theme.typography.lineHeights.relaxed};
  margin: 0;
`;

export const OutageList = ({ outages, addresses, title = 'Outages' }) => {
  if (outages.length === 0) {
    return (
      <ListContainer>
        <EmptyState>
          <EmptyTitle>No outages found</EmptyTitle>
          <EmptyText>
            Try adjusting your search or filter criteria.
          </EmptyText>
        </EmptyState>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      <ListHeader>
        <ListTitle>{title}</ListTitle>
        <ResultCount>
          {outages.length} {outages.length === 1 ? 'outage' : 'outages'}
        </ResultCount>
      </ListHeader>

      <Grid>
        {outages.map((outage) => (
          <OutageCard
            key={outage.id}
            outage={outage}
            address={addresses[outage.id]}
          />
        ))}
      </Grid>
    </ListContainer>
  );
};
