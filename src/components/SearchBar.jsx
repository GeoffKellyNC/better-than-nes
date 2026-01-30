import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  padding-right: ${props => props.$hasValue ? '48px' : theme.spacing.lg};
  font-size: ${theme.typography.sizes.base};
  background-color: ${theme.colors.background.secondary};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  color: ${theme.colors.text.primary};
  transition: all ${theme.transitions.fast};
  min-height: 48px;

  &:focus {
    border-color: ${theme.colors.accent.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }

  &::placeholder {
    color: ${theme.colors.text.muted};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.sizes.base};
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.muted};
  background-color: transparent;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.sizes.lg};
  line-height: 1;

  &:hover {
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.background.hover};
  }
`;

const SearchHint = styled.p`
  margin-top: ${theme.spacing.sm};
  font-size: ${theme.typography.sizes.xs};
  color: ${theme.colors.text.muted};
  text-align: center;
`;

export const SearchBar = ({ value, onChange, placeholder, showHint = true }) => {
  const [localValue, setLocalValue] = useState(value || '');

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onChange) {
        onChange(localValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  const handleClear = () => {
    setLocalValue('');
    if (onChange) {
      onChange('');
    }
  };

  return (
    <div>
      <SearchContainer>
        <SearchInput
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder={placeholder || 'Search by ID, address, or zip code...'}
          $hasValue={localValue.length > 0}
        />
        {localValue && (
          <ClearButton onClick={handleClear} aria-label="Clear search">
            ×
          </ClearButton>
        )}
      </SearchContainer>
      {showHint && (
        <SearchHint>
          Search by incident ID, street address, neighborhood, or zip code
        </SearchHint>
      )}
    </div>
  );
};
