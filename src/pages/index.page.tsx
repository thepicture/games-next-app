import styled from '@emotion/styled';
import { ThemeProvider, createTheme } from '@mui/material';
import Head from 'next/head';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { GameList } from 'widgets/game-list';

import { Filter } from 'features/filter-games';
import { FilterProps } from 'features/filter-games/ui';

import { Header } from 'shared/ui';

const queryClient = new QueryClient();

const theme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const Layout = styled('section')((theme) => ({
	display: 'grid',
	gridTemplateColumns: '1fr 3fr',
	background: 'black',
	padding: 8,
}));

const GamesPage = () => {
	const [filters, setFilters] = useState({ id: '', name: '', suggestions: '' });
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<Head>
					<title>Games List</title>
					<meta name="description" content="A list of games" />
				</Head>
				<Header title="Games" />
				<Layout>
					<Filter onChange={(filters) => setFilters(filters)} />
					<GameList filters={filters} />
				</Layout>
			</QueryClientProvider>
		</ThemeProvider>
	);
};

export default GamesPage;
