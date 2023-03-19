import {
	CssBaseline,
	PaletteMode,
	ThemeProvider,
	createTheme,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useMemo, useState } from 'react';

export const withTheme = (WrappedComponent: React.ComponentType) => {
	const WithTheme = (props: any) => {
		const [mode, setMode] = useState<PaletteMode>('dark');

		const theme = useMemo(
			() =>
				createTheme({
					palette: {
						mode: mode,
						background: {
							default: mode === 'dark' ? '#000' : '#fff',
						},
						primary: { '500': grey[100] },
						text: {
							primary: mode === 'dark' ? 'white' : 'black',
						},
					},
				}),
			[mode]
		);

		useEffect(() => {
			const callback = () =>
				setMode((mode) => (mode === 'dark' ? 'light' : 'dark'));

			addEventListener('switchtheme', callback);

			return () => removeEventListener('switchtheme', callback);
		});

		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<WrappedComponent {...props} />
			</ThemeProvider>
		);
	};
	return WithTheme;
};
