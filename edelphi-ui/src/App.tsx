import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import QueryScreen from "./screens/panel/query";
import LiveView from "./screens/live-view";
import Reports from "./screens/reports";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./styles/theme";
import { StoreState } from "./types";
import { AppAction } from "./actions";
import { reducer } from "./reducers";
import { createStore } from "redux";
import { Provider } from "react-redux";
import MqttConnector from "./components/mqtt-connector";
import AccessTokenRefresh from "./components/access-token-refresh";

const locale = "fi"; // TODO

const initalStoreState: StoreState = {
  locale,
  queryValidationMessage: null
};

const store = createStore<StoreState, AppAction, any, any>(
  reducer as any,
  initalStoreState
);

/**
 * Interface representing component properties
 */
interface Props {}

/**
 * Interface representing component state
 */
interface State {}
/**
 * App component
 */
export default class App extends React.Component<Props, State> {
  /**
   * Component render method
   */
  public render() {
    return (
      <Provider store={store}>
        <MqttConnector>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
              <AccessTokenRefresh>
                <div className="App">
                  <Route
                    exact
                    path="/panel/admin/liveview.page"
                    component={LiveView}
                  />

                  <Route
                    exact
                    path="/panel/admin/reports.page"
                    component={Reports}
                  />

                  <Route
                    path="/:panelSlug/:querySlug"
                    component={QueryScreen}
                  />
                </div>
              </AccessTokenRefresh>
            </BrowserRouter>
          </ThemeProvider>
        </MqttConnector>
      </Provider>
    );
  }
}
