import styled from 'styled-components';
import { theme } from '../styles/theme';

const ControlsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.sm}) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
`;

const FilterButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background-color: ${props =>
    props.$active ? theme.colors.accent.primary : theme.colors.background.tertiary};
  color: ${theme.colors.text.primary};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.medium};
  transition: all ${theme.transitions.fast};
  border: 2px solid ${props =>
    props.$active ? theme.colors.accent.primary : 'transparent'};
  min-height: 40px;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: ${props =>
      props.$active ? theme.colors.accent.secondary : theme.colors.background.hover};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  }
`;

const Label = styled.span`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.secondary};
  font-weight: ${theme.typography.weights.medium};
  white-space: nowrap;

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
    margin-bottom: ${theme.spacing.xs};
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  min-width: 180px;

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background-color: ${theme.colors.background.tertiary};
  border: 2px solid transparent;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.medium};
  cursor: pointer;
  appearance: none;
  min-height: 40px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23e8eaf0' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right ${theme.spacing.md} center;
  padding-right: ${theme.spacing.xl};

  &:hover {
    background-color: ${theme.colors.background.hover};
  }

  &:focus {
    border-color: ${theme.colors.accent.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }
`;

export const FilterControls = ({ statusFilter, onStatusChange, sortBy, onSortChange }) => {
  const statusOptions = [
    { value: 'all', label: 'All Outages' },
    { value: 'unassigned', label: 'Unassigned' },
    { value: 'assigned', label: 'Assigned' },
  ];

  const sortOptions = [
    { value: 'most-affected', label: 'Most Affected' },
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'last-updated', label: 'Recently Updated' },
  ];

  return (
    <ControlsContainer>
      <Label>Filter:</Label>
      <FilterGroup>
        {statusOptions.map((option) => (
          <FilterButton
            key={option.value}
            $active={statusFilter === option.value}
            onClick={() => onStatusChange(option.value)}
          >
            {option.label}
          </FilterButton>
        ))}
      </FilterGroup>

      <Label>Sort:</Label>
      <SelectWrapper>
        <Select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </SelectWrapper>
    </ControlsContainer>
  );
};
