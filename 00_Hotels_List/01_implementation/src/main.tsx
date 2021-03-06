import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { HotelListPageContainer } from './pages/list';
import { PageB } from './pages/b';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <HashRouter>
      <Switch>
      <Route exact={true} path="/" component={HotelListPageContainer} />
        <Route path="/pageB" component={PageB} />
      </Switch>
    </HashRouter>
  </MuiThemeProvider>
  , document.getElementById('root')
);
