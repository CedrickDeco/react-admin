import { createTheme } from "@mui/material/styles";
export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#58FF33"
        },
        secondary: {
            main: "#dc004e"
        },
        background: {
            default: "#ffffff"
        },
        text: {
            primary: "#000000"
        }
    },
    typography: {
        fontFamily: "'Roboto', 'Arial', sans-serif",
        h1: { fontSize: "2rem", fontWeight: 700 },
        body1: { fontSize: "1rem" }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#58FF33"
                }
            }
        }
    }
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#90caf9"
        },
        secondary: {
            main: "#f48fb1"
        },
        background: {
            default: "#121212"
        },
        text: {
            primary: "#ffffff"
        }
    },
    typography: {
        fontFamily: "'Roboto', 'Arial', sans-serif",
        h1: { fontSize: "2rem", fontWeight: 700 },
        body1: { fontSize: "1rem" }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#121212"
                }
            }
        }
    }
});
