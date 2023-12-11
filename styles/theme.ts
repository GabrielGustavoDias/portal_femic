const defaultTheme = {
  // screens for a vast array of web-capable  browsers.
  screens: {
    xs: "425px",
    sm: "480px",
    mm: "768px",
    md: "1024px",
    lg: "1440px",
    xl: "1600px",
  },
  // spacing
  spacing: {
    "1": "8px",
    "2": "12px",
    "3": "16px",
    "4": "24px",
    "5": "32px",
    "6": "48px",
  },
  // font family
  fontFamily: {
    inter: ["Inter", "sans-serif"],
    arial: ["Arial", "sans-serif"],
  },
  // font sizes
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    xl2: "1.5rem",
    xl3: "1.875rem",
    xl4: "2.25rem",
    xl5: "3rem",
    xl6: "3.75rem",
    xl7: "4.5rem",
    xl8: "6rem",
    xl9: "8rem",
  },
  // font weights
  fontWeights: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    bolder: 800,
    black: 900,
  },
  // font style
  fontStyle: {
    italic: "italic",
    "not-italic": "normal",
  },
  // letter spacing
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  // line heights
  lineHeights: {
    xs: "1rem",
    sm: "1.25rem",
    base: "1.5rem",
    lg: "1.75rem",
    xl: "1.75rem",
    "2xl": "2rem",
    "3xl": "2.25rem",
    "4xl": "2.5rem",
    "5xl": 1,
    "6xl": 1,
    "7xl": 1,
    "8xl": 1,
    "9xl": 1,
  },
  // box shadow
  boxShadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    none: "0 0 #0000",
  },
};

export const darkTheme = {
  // background colors
  bgColors: {
    transparent: "transparent",
    black: "#000",
    white: "#fff",
    primary: "#010204",
    secondary: "#15141d",
    pink: "#ff2dbc",
    red: "#ff0000",
    ocean: "#F24C4E",
  },
  // text colors
  textColors: {
    black: "#000",
    white: "#fff",
    light: "#ffffffbf",
    primary: "#fff",
    secondary: "#ffffffbf",
    pink: "#ff2dbc",
  },
};

export const lightTheme = {
  // background colors
  bgColors: {
    transparent: "transparent",
    black: "#212121",
    white: "#fff",
    primary: "#FFF",
    secondary: "#15141d",
    ocean: "#1FB58F",
    sand: "#EAB126",
    cocktail: "#F24C4E",
    palm: "#F24C4E",
  },
  // text colors
  textColors: {
    black: "#000",
    white: "#fff",
    light: "#ffffffbf",
    primary: "#222",
    secondary: "#adadad",
    pink: "#ff2dbc",
    ocean: "#1FB58F",
    sand: "#EAB126",
    cocktail: "#F24C4E",
    palm: "#1B7824",
  },
};

export default defaultTheme;
