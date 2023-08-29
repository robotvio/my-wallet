import { AppProps } from 'next/app';
import Layout from './app/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }: AppProps) {
    // Exclude navigation on the specific page
    const excludeNavigation = false//router.pathname === '/login';

    return (
        <Layout>
            {!excludeNavigation && <Navigation />}
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
