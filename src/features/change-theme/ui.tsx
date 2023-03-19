import { WbSunnyOutlined } from '@mui/icons-material';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import React from 'react';

export const ThemeSwitch = () => {
	const theme = useTheme();

	return (
		<Tooltip
			title="Switch Theme"
			onClick={() => dispatchEvent(new Event('switchtheme'))}
		>
			<IconButton>
				<WbSunnyOutlined />
			</IconButton>
		</Tooltip>
	);
};
