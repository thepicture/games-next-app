import {
	Card,
	CardActionArea,
	CardContent,
	CircularProgress,
	Rating,
	Typography,
	styled,
} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { rawgApi } from 'shared/api';

const TwoColumns = styled('section')(() => ({
	display: 'flex',
	justifyContent: 'space-between',

	paddingBottom: 8,
}));

export const Game = ({ game }: { game: rawgApi.GameModels.GameDto }) => {
	const router = useRouter();

	const [isImageLoaded, setIsImageLoaded] = useState(false);

	return (
		<Card sx={{ width: '345px' }}>
			<CardActionArea onClick={() => router.push(`/game/${game.id}`)}>
				<section style={{ position: 'relative' }}>
					{!isImageLoaded && (
						<section
							style={{
								position: 'absolute',
								width: '100%',
								height: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<CircularProgress />
						</section>
					)}
					<CardMedia
						component="img"
						image={game.background_image}
						alt={`${game.name} - ${game.id}`}
						loading="lazy"
						height="256px"
						onLoad={() => setIsImageLoaded(true)}
						sx={{ opacity: isImageLoaded ? 1 : 0 }}
					/>
				</section>
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
