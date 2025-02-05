import { createContext, useState, useEffect, ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";

interface ThemeContextType {
	toggleTheme: () => void;
	themeMode: "light" | "dark";
}

export const ThemeContext = createContext<ThemeContextType>({
	toggleTheme: () => {},
	themeMode: "light"
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [themeMode, setThemeMode] = useState<"light" | "dark">("light"); // Valeur par défaut

	// Récupérer la valeur de localStorage après le montage
	useEffect(() => {
		const storedTheme = localStorage.getItem("theme") as "light" | "dark";
		if (storedTheme) {
			console.log("Thème récupéré depuis localStorage :", storedTheme);
			setThemeMode(storedTheme);
		}
	}, []);

	useEffect(
		() => {
			console.log("🔄 Mise à jour du thème :", themeMode);
			localStorage.setItem("theme", themeMode);
		},
		[themeMode]
	);

	const toggleTheme = () => {
		setThemeMode(prev => {
			const newTheme = prev === "light" ? "dark" : "light";
			console.log("Bouton cliqué, nouveau thème :", newTheme);
			return newTheme;
		});
	};

	useEffect(
		() => {
			console.log("🔄 Mise à jour après changement :", themeMode);
		},
		[themeMode]
	);

	return (
		<ThemeContext.Provider value={{ toggleTheme, themeMode }}>
			<MuiThemeProvider
				theme={themeMode === "light" ? lightTheme : darkTheme}
			>
				console.log("🖌️ Thème appliqué à l'interface :", themeMode)
				{children}
			</MuiThemeProvider>
		</ThemeContext.Provider>
	);
};
