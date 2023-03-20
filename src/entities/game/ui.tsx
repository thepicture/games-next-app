import {
	CardActionArea,
	CardContent,
	Rating,
	Typography,
	styled,
} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { useRouter } from 'next/router';
import React from 'react';

import { rawgApi } from 'shared/api';
import { Card } from 'shared/ui';

const TwoColumns = styled('section')(() => ({
	display: 'flex',
	justifyContent: 'space-between',

	paddingBottom: 8,
}));

export const Game = ({ game }: { game: rawgApi.GameModels.GameDto }) => {
	const router = useRouter();

	return (
		<Card>
			<CardActionArea onClick={() => router.push(`/game/${game.id}`)}>
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
					<Rating
						defaultValue={0}
						value={game.rating}
						readOnly
						precision={0.5}
						sx={{ mb: 2 }}
					/>{' '}
					<Typography display="inline" variant="caption">
						{game.rating}/5
					</Typography>
					<TwoColumns>
						<Typography variant="body2" color="text.secondary">
							{game.ratings_count} votes
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{game.suggestions_count} suggestion
							{game.suggestions_count === 1 ? '' : 's'}
						</Typography>
					</TwoColumns>
					<TwoColumns>
						<Typography variant="body2" color="text.secondary">
							released on {new Date(game.released).toLocaleDateString()}
						</Typography>
					</TwoColumns>
					<Typography variant="body2" color="text.secondary" display="inline">
						available on{' '}
					</Typography>
					<Typography variant="body2" display="inline">
						{game.platforms
							.slice(0, 2)
							.map(({ platform }) => platform.name)
							.join(', ')}
						{game.platforms.length > 2
							? ` and ${game.platforms.slice(2).length} more`
							: ''}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};
