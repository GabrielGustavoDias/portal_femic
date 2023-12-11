import { CssBaseline } from '@nextui-org/react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props: any) => sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);

			return {
				...initialProps,
				styles: [
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>,
				],
			};
		} finally {
			sheet.seal();
		}
	}
	render() {
		return (
			<Html lang="pt-BR">
				<Head>
					<link rel="icon" href="/fav.png" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
					<link
						href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&display=swap"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&display=swap"
						rel="stylesheet"
					/>
					{CssBaseline.flush()}
				</Head>
				<body>
					<Main />
					<noscript>Desculpa mas seu browser não suporta javascript ou esta desativado :(</noscript>
					<NextScript />
				</body>
			</Html>
		);
	}
}
export default MyDocument;
