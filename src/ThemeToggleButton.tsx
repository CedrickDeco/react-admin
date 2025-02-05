import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const ThemeToggleButton = () => {
	const themeContext = useContext(ThemeContext);

	if (!themeContext) {
		return null;
	}

	const { toggleTheme, themeMode } = themeContext;

	return (
		<IconButton onClick={toggleTheme} color="inherit">
			{themeMode === "light" ? <Brightness4 /> : <Brightness7 />}
		</IconButton>
	);
};

export default ThemeToggleButton;
