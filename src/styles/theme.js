export const theme = {
  colors: {
    background: {
      primary: '#0a0e27',
      secondary: '#1a1f3a',
      tertiary: '#252b4a',
      hover: '#2a3050',
    },
    text: {
      primary: '#e8eaf0',
      secondary: '#b8bcc8',
      muted: '#8a8f9d',
    },
    status: {
      unassigned: '#ef4444',
      assigned: '#f97316',
      resolved: '#22c55e',
      unknown: '#6b7280',
    },
    accent: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
    },
    border: '#2a3050',
    shadow: 'rgba(0, 0, 0, 0.5)',
  },

  typography: {
    fonts: {
      body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },

  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },

  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
  },

  transitions: {
    fast: '150ms ease-in-out',
    base: '200ms ease-in-out',
    slow: '300ms ease-in-out',
  },

  zIndex: {
    base: 1,
    dropdown: 10,
    sticky: 100,
    modal: 1000,
    tooltip: 1100,
  },
};

export const getStatusColor = (status) => {
  const statusLower = (status || '').toLowerCase();

  if (statusLower.includes('unassigned')) return theme.colors.status.unassigned;
  if (statusLower.includes('assigned')) return theme.colors.status.assigned;
  if (statusLower.includes('resolved') || statusLower.includes('complete'))
    return theme.colors.status.resolved;

  return theme.colors.status.unknown;
};
