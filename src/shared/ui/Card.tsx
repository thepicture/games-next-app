import { CardActionArea } from '@mui/material';
import { Card as MuiCard } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import * as React from 'react';

const MAX_WIDTH = 345;

export function Card({
	image,
	children,
}: {
	image: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<MuiCard sx={{ maxWidth: MAX_WIDTH }}>
			<CardActionArea>
				{image}
				<CardContent>{children}</CardContent>
			</CardActionArea>
		</MuiCard>
	);
}
