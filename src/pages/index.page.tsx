import Head from 'next/head';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { GameList } from 'widgets/game-list';

import { Header } from 'shared/ui';

const queryClient = new QueryClient();

const GamesPage = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Head>
				<title>Games List</title>
				<meta name="description" content="A list of games" />
			</Head>
			<Header title="Games" />
			<GameList />
		</QueryClientProvider>
	);
};

export default GamesPage;
