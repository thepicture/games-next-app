import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CircularProgress,
	Rating,
	Typography,
	styled,
	useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { rawgApi } from 'shared/api';
import { mobile } from 'shared/config';

const TwoColumns = styled('section')(() => ({
	display: 'flex',
	justifyContent: 'space-between',

	paddingBottom: 8,
}));

export const Game = ({ game }: { game: rawgApi.GameModels.GameDto }) => {
	const router = useRouter();
	const matchesQuery = useMediaQuery(mobile);

	const [isImageLoaded, setIsImageLoaded] = useState(false);

	return (
		<Card
			sx={{
				width: '345px',
				[mobile]: {
					width: '100%',
				},
			}}
		>
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
					{matchesQuery ? (
						<section
							style={{
								width: '100%',
								height: '256px',
							}}
						>
							<Image
								src={game.background_image}
								alt={`${game.name} - ${game.id}`}
								loading="lazy"
								fill
								onLoad={() => setIsImageLoaded(true)}
								sizes="(max-width: 640px) 25vw,
									   (max-width: 1200px) 50vw,
									   33vw"
								style={{
									opacity: isImageLoaded ? 1 : 0,
									objectFit: 'cover',
								}}
							/>
						</section>
					) : (
						<Image
							src={game.background_image}
							alt={`${game.name} - ${game.id}`}
							loading="lazy"
							width={matchesQuery ? 500 : 345}
							height="256"
							onLoad={() => setIsImageLoaded(true)}
							style={{
								opacity: isImageLoaded ? 1 : 0,
								objectFit: 'cover',
							}}
						/>
					)}
				</section>
				<CardContent>
					<Typography gutterBottom variant="h5" component="p">
						{game.name}
					</Typography>
					<Box display="flex" alignItems="center" mb={2}>
						<Rating
							defaultValue={0}
							value={game.rating}
							readOnly
							precision={0.5}
						/>
						<Typography display="inline" variant="caption" pt={1 / 4}>
							{game.rating}/5
						</Typography>
					</Box>
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
