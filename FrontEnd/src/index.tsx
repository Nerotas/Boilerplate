import './index.scss';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from 'react-dom/client';

import store from './redux-state/store';
import Router from './AllRoutes/Routes';
import GlobalSnackbar from 'wrappers/GlobalSnackbarWrapper';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            retry: false,
            //while fetching data, assume it is any empty array
            placeholderData: [],
            //by default data is fresh for 60 seconds
            staleTime: 60 * 1000,
            enabled: true,
        },
    },
});

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <HelmetProvider>
        <Provider store={store}>
            <GlobalSnackbar />
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={Router} />
                <ReactQueryDevtools />
            </QueryClientProvider>
        </Provider>
    </HelmetProvider>
);
