import { CardActionArea, CardContent, Typography, styled } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Image from 'next/image';
import React from 'react';

import { rawgApi } from 'shared/api';
import { Card } from 'shared/ui';

const ImageWithContent = styled('section')(() => ({
	position: 'relative',

	display: 'grid',
	gridTemplateRows: '1px 200px',

	width: 256,
	margin: 0,
}));

export const Game = ({ game }: { game: rawgApi.GameModels.GameDto }) => {
	return (
		<Card>
			<CardActionArea>
				<CardMedia
					component="img"
					image={game.background_image}
					alt={`${game.name} - ${game.id}`}
					loading="lazy"
					sx={{ minHeight: 256 }}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="p">
						{game.name}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{game.suggestions_count} suggestion
						{game.suggestions_count === 1 ? '' : 's'}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};
