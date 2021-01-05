import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { CookiesProvider } from 'react-cookie';
import { CssBaseline } from '@material-ui/core';
import App from '../components/App';
import store, { runSaga } from '../store';
import { GlobalTheme } from '../components/Theme/GlobalTheme';
import initGa from '../utils/GoogleAnalytics';
import intializeGTM from '../utils/GoogleTagManager';
import mySaga from '../sagas/RootSaga/rootSaga';
import 'typeface-archivo-black';
import 'typeface-lobster';
import 'typeface-roboto';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../components/Theme/carousel.css';

function Main(): ReactElement {
	React.useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.remove();
		}
	}, []);

	return (
		<CookiesProvider>
			<ThemeProvider theme={GlobalTheme}>
				<CssBaseline />
				<Provider store={store}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</Provider>
			</ThemeProvider>
		</CookiesProvider>
	);
}

// async saga run
runSaga(mySaga);
intializeGTM();
initGa();
ReactDOM.hydrate(<Main />, document.querySelector('#content'));
