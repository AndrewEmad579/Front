export const theme = {
  colors: {
    primary: {
      DEFAULT: '#B8860B', // Egyptian Gold
      light: '#DAA520',
      dark: '#8B6914',
    },
    secondary: {
      DEFAULT: '#2F4F4F', // Dark Slate
      light: '#4A766E',
      dark: '#1C3131',
    },
    accent: {
      DEFAULT: '#D4AF37', // Metallic Gold
      light: '#FFD700',
      dark: '#996515',
    },
    background: {
      DEFAULT: '#FFFAF0', // Floral White
      dark: '#F5F5DC', // Beige
    },
    text: {
      primary: '#2D2D2D',
      secondary: '#4A4A4A',
      muted: '#717171',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  typography: {
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },
} as const; 