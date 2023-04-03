import styled from '@emotion/styled';
import { Rating, Typography } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { rawgApi } from 'shared';

import { ThemeSwitch } from 'features/change-theme';

import { gameModel } from 'entities/game';
import { Screenshot } from 'entities/screenshot';

import { IMAGE_QUALITY } from 'shared/config';
import { Header, StickyHeader } from 'shared/ui';
import { useRouter } from 'next/router';

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

const ResponsiveLayout = styled.section`
	display: grid;
	grid-template-columns: 1fr 1fr;
	padding: 32px;

	@media screen and (max-width: 1080px) {
		grid-template-columns: 1fr;
	}
`;

const Developer = styled('address')(() => ({
	display: 'flex',
	alignItems: 'center',
}));

const GameDetailPage = () => {
	const router = useRouter();
	const slug = router.query.slug as string;

	const [game, setGame] = useState<rawgApi.GameModels.GameDetailDto | null>(
		null
	);
	const { data: screenshots, isLoading: areScreenshotsLoading } =
		gameModel.useScreenshotsQuery(slug);

	useEffect(() => {
		gameModel.getGameBySlug(slug).then((game) => {
			setGame(game);
		});
	}, [slug]);

	if (!game) {
		return <Typography>Loading...</Typography>;
	}

	return (
		<>
			<Head key="head">
				<title key="details">{game.name} - Details</title>
				<meta
					key="description"
					name="description"
					content={`Details of ${game.name}`}
				/>
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
							sizes="(max-width: 768px) 25vw,
								   (max-width: 1200px) 50vw,
								   100vw"
							quality={IMAGE_QUALITY}
							style={{ objectFit: 'cover' }}
							priority
						/>
					</ImageWrapper>
					{game.background_image_additional && (
						<ImageWrapper>
							<Image
								src={game.background_image_additional}
								alt={`${game.name} additional cover`}
								fill
								quality={IMAGE_QUALITY}
								sizes="(max-width: 768px) 25vw,
									   (max-width: 1200px) 50vw,
									   100vw"
								style={{ objectFit: 'cover' }}
								priority
							/>
						</ImageWrapper>
					)}
				</Carousel>
				<ResponsiveLayout>
					<section>
						<Typography variant="h3" component="h2">
							{game.name}
						</Typography>
						<DeveloperList>
							<Typography sx={{ fontSize: 14, display: 'inline' }}>
								Made by
							</Typography>
							{game.developers.map((developer) => (
								<Developer key={developer.id}>
									<Image
										title={developer.name}
										src={developer.image_background}
										alt={`logo of ${developer.name}`}
										width={32}
										height={32}
										style={{ borderRadius: '8px', padding: 4 }}
									/>
									{developer.name}
								</Developer>
							))}
						</DeveloperList>
						<Typography variant="h4" component="h3" gutterBottom>
							Rating
						</Typography>
						<Rating
							defaultValue={0}
							value={game.rating}
							readOnly
							sx={{ mb: 2 }}
						/>
						<Typography variant="h4" component="h3" gutterBottom>
							Release Date
						</Typography>
						<Typography
							sx={{ fontSize: 16 }}
							color="text.secondary"
							gutterBottom
						>
							{new Date(game.released).toLocaleDateString()}
						</Typography>
						<Typography variant="h4" component="h3" gutterBottom>
							Description
						</Typography>
						<Typography
							sx={{ fontSize: 16 }}
							color="text.secondary"
							gutterBottom
						>
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
					</section>
					<section>
						<Typography variant="h4" component="h3" gutterBottom>
							Screenshots
						</Typography>
						<Screenshots>
							{areScreenshotsLoading || !screenshots ? (
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
					</section>
				</ResponsiveLayout>
			</Layout>
		</>
	);
};

export default GameDetailPage;
