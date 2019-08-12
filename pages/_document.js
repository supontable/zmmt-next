/* eslint-disable max-len */
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/styles';
import theme from '../lib/theme';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        const isProduction = process.env.NODE_ENV === 'production'
        return { ...initialProps, isProduction }
    }

    ymScript() {
        return {
            __html: ``
        }
    }

    ymNoScript() {
        return {
            __html: ``
        }
    }

    ga() {
        return {
            __html: ``
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8" />
                    {/* Use minimum-scale=1 to enable GPU rasterization */}
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                    />
                    {/* PWA primary color */}
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                    <link rel='icon' type='image/x-icon' href='/static/icons/favicon.ico' />
                    <link rel='icon' type='image/png' href='/static/icons/favicon.png' />
                    <link rel='apple-touch-icon' href='/static/icons/apple-touch-icon.png' />
                    <link rel='apple-touch-icon' sizes='76x76' href='/static/icons/apple-touch-icon-ipad.png' />
                    <link rel='apple-touch-icon' sizes='120x120' href='/static/icons/apple-touch-icon-iphone-retina.png' />
                    <link rel='apple-touch-icon' sizes='152x152' href='/static/icons/apple-touch-icon-ipad-retina.png' />
                    <script dangerouslySetInnerHTML={this.ga()} />
                    <script dangerouslySetInnerHTML={this.ymScript()} type='text/javascript' />
                    <noscript dangerouslySetInnerHTML={this.ymNoScript()} />
                </Head>
                <body>
                    <Main />
                    <div id='modal' />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
MyDocument.getInitialProps = async ctx => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: App => props => sheets.collect(<App {...props} />),
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [
            <React.Fragment key="styles">
                {initialProps.styles}
                {sheets.getStyleElement()}
            </React.Fragment>,
        ],
    };
};
export default MyDocument