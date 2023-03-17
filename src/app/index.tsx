import type { AppProps } from 'next/app';
import { ComponentType } from 'react';

import 'app/styles/reset.css';

import { withQueryClient } from './providers/with-query-client';
import { withTheme } from './providers/with-theme';

function ProvidedApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default withTheme(
	withQueryClient(ProvidedApp as unknown as ComponentType)
);
