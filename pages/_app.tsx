import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import theme from 'src/theme';

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </QueryClientProvider>
    );
}
