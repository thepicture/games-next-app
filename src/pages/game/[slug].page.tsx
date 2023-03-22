import styled from '@emotion/styled';
import { Rating, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { rawgApi } from 'shared';

import { ThemeSwitch } from 'features/change-theme';

import { gameModel } from 'entities/game';
import { Screenshot } from 'entities/screenshot';

import { IMAGE_QUALITY } from 'shared/config';
import { Header, StickyHeader } from 'shared/ui';

const Layout = styled('section')(() => ({
	display: 'grid',
	position: 'relative',
	gridTemplateRows: 'auto auto',
	padding: 8,
}));

const DeveloperList = styled('section')(() => ({
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	paddingTop: 16,
	paddingBottom: 16,
}));

const ImageWrapper = styled('section')(() => ({
	position: 'relative',
	width: '100%',
	height: '256px',
}));

const Screenshots = styled('section')(() => ({
	position: 'relative',
	display: 'flex',
	justifyContent: 'center',
	flexWrap: 'wrap',
	gap: 16,
}));

const GameDetailPage = ({
	game,
}: {
	game: rawgApi.GameModels.GameDetailDto;
}) => {
	const { isLoading, data: screenshots } = gameModel.useScreenshotsQuery(
		game.slug
	);

	return (
		<>
			<Head>
				<title>{game.name} - Details</title>
				<meta name="description" content={`Details of ${game.name}`} />
			</Head>
			<StickyHeader>
				<Header title={game.name} panel={<ThemeSwitch />} />
			</StickyHeader>
			<Layout>
				<Carousel sx={{ margin: '-8px' }}>
					<ImageWrapper>
						<Image
							src={game.background_image}
							alt={`${game.name} cover`}
							fill
							sizes="(max-width: 640px) 25vw,
								   (max-width: 1200px) 50vw,
								   33vw"
							quality={IMAGE_QUALITY}
							style={{ objectFit: 'cover' }}
						/>
					</ImageWrapper>
					{game.background_image_additional && (
						<ImageWrapper>
							<Image
								src={game.background_image_additional}
								alt={`${game.name} additional cover`}
								fill
								quality={IMAGE_QUALITY}
								sizes="(max-width: 768px) 100vw,
									   (max-width: 1200px) 50vw,
									   33vw"
								style={{ objectFit: 'cover' }}
							/>
						</ImageWrapper>
					)}
				</Carousel>
				<Typography variant="h3" component="h2" mt={4}>
					{game.name}
				</Typography>
				<DeveloperList>
					<Typography sx={{ fontSize: 14, display: 'inline' }}>
						Made by
					</Typography>
					{game.developers.map((developer) => (
						<>
							<Image
								title={developer.name}
								key={developer.id.toString()}
								src={developer.image_background}
								alt={`logo of ${developer.name}`}
								width={32}
								height={32}
								style={{ borderRadius: '8px', padding: 4 }}
							/>
							{developer.name}
						</>
					))}
				</DeveloperList>
				<Typography
					variant="h4"
					component="h3"
					sx={{ float: 'left' }}
					gutterBottom
				>
					Rating
				</Typography>
				<Rating defaultValue={0} value={game.rating} readOnly sx={{ mb: 2 }} />
				<Typography variant="h4" component="h3" gutterBottom>
					Release Date
				</Typography>
				<Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
					{new Date(game.released).toLocaleDateString()}
				</Typography>
				<Typography variant="h4" component="h3" gutterBottom>
					Description
				</Typography>
				<Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
					{game.description_raw}
				</Typography>
				<Typography variant="h4" component="h3" gutterBottom>
					Download Link
				</Typography>
				<Link
					href={game.website}
					style={{
						fontSize: 16,
						color: 'inherit',
						paddingBottom: 16,
					}}
					color="text.secondary"
				>
					{game.website}
				</Link>
				<Typography variant="h4" component="h3" gutterBottom>
					Screenshots
				</Typography>
				<Screenshots>
					{isLoading || !screenshots ? (
						<p>Loading screenshots...</p>
					) : (
						screenshots.pages
							.flatMap(
								(page) =>
									(
										page as unknown as {
											results: rawgApi.GameModels.Screenshot;
										}
									).results
							)
							.map((screenshot: rawgApi.GameModels.Screenshot) => (
								<Screenshot
									key={screenshot.id}
									screenshot={screenshot}
									gameName={game.name}
								/>
							))
					)}
				</Screenshots>
			</Layout>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const game = await gameModel.getGameBySlug(
		(context.params as { slug: string }).slug
	);

	return {
		props: {
			game,
		},
	};
};

export default GameDetailPage;
