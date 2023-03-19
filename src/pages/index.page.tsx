import styled from '@emotion/styled';
import Head from 'next/head';
import React, { useState } from 'react';

import { GameList } from 'widgets/game-list';

import { ThemeSwitch } from 'features/change-theme';
import { Filter } from 'features/filter-games';

import { Header } from 'shared/ui';

const Layout = styled('section')(() => ({
	display: 'grid',
	gridTemplateColumns: '1fr 3fr',
	padding: 8,
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
				<title>Games List</title>
				<meta name="description" content="A list of games" />
			</Head>
			<Header title="Games" panel={<ThemeSwitch />} />
			<Layout>
				<Filter onChange={(filters) => setFilters(filters)} />
				<GameList filters={filters} />
			</Layout>
		</>
	);
};

export default GamesPage;
