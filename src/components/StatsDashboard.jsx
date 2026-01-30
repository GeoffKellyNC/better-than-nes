import { useMemo } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { StatsCard } from './StatsCard';
import { formatNumber } from '../utils/formatters';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    padding: ${theme.spacing.md};
    gap: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const StatsDashboard = ({ outages }) => {
  const stats = useMemo(() => {
    const totalOutages = outages.length;
    const totalAffected = outages.reduce((sum, o) => sum + (o.numPeople || 0), 0);

    const unassigned = outages.filter(o =>
      (o.status || '').toLowerCase().includes('unassigned')
    ).length;

    const assigned = outages.filter(o =>
      (o.status || '').toLowerCase().includes('assigned') &&
      !(o.status || '').toLowerCase().includes('unassigned')
    ).length;

    const averageAffected = totalOutages > 0
      ? Math.round(totalAffected / totalOutages)
      : 0;

    const largestOutage = outages.length > 0
      ? Math.max(...outages.map(o => o.numPeople || 0))
      : 0;

    return {
      totalOutages,
      totalAffected,
      unassigned,
      assigned,
      averageAffected,
      largestOutage,
    };
  }, [outages]);

  return (
    <DashboardContainer>
      <StatsCard
        icon="⚡"
        label="Total Outages"
        value={formatNumber(stats.totalOutages)}
        subtitle="Active incidents"
        accentColor={theme.colors.accent.primary}
        delay="0s"
      />

      <StatsCard
        icon="👥"
        label="People Affected"
        value={formatNumber(stats.totalAffected)}
        subtitle="Without power"
        accentColor={theme.colors.accent.warning}
        delay="0.1s"
      />

      <StatsCard
        icon="🔴"
        label="Unassigned"
        value={formatNumber(stats.unassigned)}
        subtitle="Awaiting crew"
        accentColor={theme.colors.status.unassigned}
        delay="0.2s"
      />

      <StatsCard
        icon="🟠"
        label="In Progress"
        value={formatNumber(stats.assigned)}
        subtitle="Crew assigned"
        accentColor={theme.colors.status.assigned}
        delay="0.3s"
      />

      <StatsCard
        icon="📊"
        label="Average Size"
        value={formatNumber(stats.averageAffected)}
        subtitle="People per outage"
        accentColor={theme.colors.accent.secondary}
        delay="0.4s"
      />

      <StatsCard
        icon="⚠️"
        label="Largest Outage"
        value={formatNumber(stats.largestOutage)}
        subtitle="Most affected"
        accentColor={theme.colors.accent.danger}
        delay="0.5s"
      />
    </DashboardContainer>
  );
};
