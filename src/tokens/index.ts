export interface DesignTokens {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    healthColor: string;
    staminaColor: string;
    manaColor: string;
    xpColor: string;
    [key: string]: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      bold: number;
    };
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadow: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  zIndex: {
    base: number;
    dropdown: number;
    modal: number;
    overlay: number;
    toast: number;
    tooltip: number;
    debug: number;
  };
  animations: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: string;
  };
}

export const defaultTokens: DesignTokens = {
  colors: {
    primary: '#2563eb',
    secondary: '#64748b',
    success: '#22c55e',
    warning: '#eab308',
    error: '#ef4444',
    info: '#3b82f6',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f8fafc',
    textSecondary: '#94a3b8',
    border: '#334155',
    healthColor: '#ef4444',
    staminaColor: '#f59e0b',
    manaColor: '#3b82f6',
    xpColor: '#a855f7',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  typography: {
    fontFamily: '"Inter", system-ui, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
  radius: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    full: '9999px',
  },
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.2)',
  },
  zIndex: {
    base: 0,
    dropdown: 1000,
    modal: 2000,
    overlay: 1500,
    toast: 3000,
    tooltip: 4000,
    debug: 9999,
  },
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: 'ease-in-out',
  },
};
