import { Card as MuiCard } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import * as React from 'react';

const MAX_WIDTH = 345;

export function Card({ children }: { children: React.ReactNode }) {
	return <MuiCard sx={{ maxWidth: MAX_WIDTH }}>{children}</MuiCard>;
}
