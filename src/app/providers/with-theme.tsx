import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		mode: 'dark',
	},
});

export const withTheme = (WrappedComponent: React.ComponentType) => {
	const WithTheme = (props: any) => (
		<ThemeProvider theme={theme}>
			<WrappedComponent {...props} />
		</ThemeProvider>
	);
	return WithTheme;
};
