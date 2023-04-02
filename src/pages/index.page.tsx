import { styled } from '@mui/material';
import Head from 'next/head';
import React, { useState } from 'react';

import { GameList } from 'widgets/game-list';

import { ThemeSwitch } from 'features/change-theme';
import { Filter } from 'features/filter-games';

import { mobile } from 'shared/config';
import { Header, StickyHeader } from 'shared/ui';

const Layout = styled('section')(() => ({
	display: 'grid',
	gridTemplateColumns: '1fr 3fr',
	padding: 16,
	[mobile]: {
		paddingTop: 0,
		marginTop: 0,
		gridTemplateColumns: '1fr',
	},
}));

const StickyFilter = styled('section')(({ theme }) => ({
	position: 'sticky',
	top: 16 + 64,
	height: 'fit-content',
	[mobile]: {
		top: 16 + 40,
		paddingTop: 16,
		paddingBottom: 16,
		zIndex: 1,
		background: theme.palette.background.default,
	},
}));

const GamesPage = () => {
	const [filters, setFilters] = useState({
		id: '',
		name: '',
		suggestions: '',
	});

	return (
		<>
			<Head>
				<title key="title">Games List</title>
				<meta key="description" name="description" content="A list of games" />
			</Head>
			<StickyHeader>
				<Header title="Games" panel={<ThemeSwitch />} />
			</StickyHeader>
			<Layout>
				<StickyFilter>
					<Filter onChange={(filters) => setFilters(filters)} />
				</StickyFilter>
				<GameList filters={filters} />
			</Layout>
		</>
	);
};

export default GamesPage;
