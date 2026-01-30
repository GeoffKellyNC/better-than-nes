import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.typography.fonts.body};
    font-size: ${theme.typography.sizes.base};
    line-height: ${theme.typography.lineHeights.normal};
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.background.primary};
    overflow-x: hidden;
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.typography.fonts.heading};
    font-weight: ${theme.typography.weights.bold};
    line-height: ${theme.typography.lineHeights.tight};
    color: ${theme.colors.text.primary};
  }

  h1 {
    font-size: ${theme.typography.sizes['3xl']};
  }

  h2 {
    font-size: ${theme.typography.sizes['2xl']};
  }

  h3 {
    font-size: ${theme.typography.sizes.xl};
  }

  h4 {
    font-size: ${theme.typography.sizes.lg};
  }

  p {
    margin-bottom: ${theme.spacing.md};
  }

  a {
    color: ${theme.colors.accent.primary};
    text-decoration: none;
    transition: color ${theme.transitions.fast};

    &:hover {
      color: ${theme.colors.accent.secondary};
    }
  }

  button {
    font-family: ${theme.typography.fonts.body};
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    transition: all ${theme.transitions.fast};

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  input, textarea, select {
    font-family: ${theme.typography.fonts.body};
    font-size: ${theme.typography.sizes.base};
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.background.secondary};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.md};
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    outline: none;
    transition: all ${theme.transitions.fast};

    &:focus {
      border-color: ${theme.colors.accent.primary};
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    &::placeholder {
      color: ${theme.colors.text.muted};
    }
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.background.tertiary};
    border-radius: ${theme.borderRadius.full};

    &:hover {
      background: ${theme.colors.background.hover};
    }
  }

  .leaflet-container {
    font-family: ${theme.typography.fonts.body};
    background-color: ${theme.colors.background.secondary};
  }

  .leaflet-popup-content-wrapper {
    background-color: ${theme.colors.background.secondary};
    color: ${theme.colors.text.primary};
    border-radius: ${theme.borderRadius.md};
    box-shadow: ${theme.shadows.lg};
  }

  .leaflet-popup-tip {
    background-color: ${theme.colors.background.secondary};
  }

  .leaflet-control-zoom a {
    background-color: ${theme.colors.background.secondary} !important;
    color: ${theme.colors.text.primary} !important;
    border: 1px solid ${theme.colors.border} !important;

    &:hover {
      background-color: ${theme.colors.background.hover} !important;
    }
  }

  .leaflet-control-attribution {
    background-color: rgba(10, 14, 39, 0.8) !important;
    color: ${theme.colors.text.muted} !important;

    a {
      color: ${theme.colors.accent.primary} !important;
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    html {
      font-size: 14px;
    }

    h1 {
      font-size: ${theme.typography.sizes['2xl']};
    }

    h2 {
      font-size: ${theme.typography.sizes.xl};
    }

    h3 {
      font-size: ${theme.typography.sizes.lg};
    }
  }
`;
