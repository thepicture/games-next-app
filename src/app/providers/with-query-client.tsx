import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const withQueryClient = (WrappedComponent: React.ComponentType) => {
	const WithQueryClient = (props: any) => (
		<QueryClientProvider client={queryClient}>
			<WrappedComponent {...props} />
		</QueryClientProvider>
	);
	return WithQueryClient;
};
