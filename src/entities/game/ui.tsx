import { CardActionArea, CardContent, Typography, styled } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import React from 'react';

import { rawgApi } from 'shared/api';
import { Card } from 'shared/ui';

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
