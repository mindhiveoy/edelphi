import React from "react";
import PanelLayout from "../../components/generic/panel-layout";
import api from "../../api/api";
import { AccessToken, StoreState, WithAccessToken } from "../../types";
import { User, Panel, Query } from "../../generated/client";
import { SemanticShorthandCollection } from "semantic-ui-react/dist/commonjs/generic";
import { BreadcrumbSectionProps } from "semantic-ui-react";
import strings from "../../localization/strings";
import { connect, DispatchProp } from "react-redux";
import { Grid } from "@material-ui/core";
import DocumentsContainer from "../../components/panel/documents";
import QueriesContainer from "../../components/panel/queries";
import BulletinsContainer from "../../components/panel/bulletins";
import { withRouter, RouteComponentProps } from "react-router";

interface PanelRouteParams {
  panelSlug: string;
}

interface PanelPageProps
  extends DispatchProp<any>,
    RouteComponentProps<PanelRouteParams> {
  accessToken: AccessToken;
  panelSlug: string;
}

interface State {
  loading: boolean;
  loggedUser?: User;
  panel?: Panel;
  queries?: Query[];
}

class PanelPage extends React.Component<
  PanelPageProps & WithAccessToken,
  State
> {
  public state: State = {
    loading: true
  };

  public componentDidMount = async () => {
    await this.loadData();
  };

  public componentDidUpdate = async (prevProps: WithAccessToken) => {
    if (prevProps.accessToken !== this.props.accessToken) {
      await this.loadData;
    }
  };

  public render() {
    const { accessToken } = this.props;
    const { loggedUser, loading, panel } = this.state;

    const breadcrumbs: SemanticShorthandCollection<BreadcrumbSectionProps> = [
      { key: "home", content: strings.generic.eDelphi, href: "/" },
      {
        key: "panel",
        content: "panel.name",
        href: `/{panel.urlName}`
      }
    ];

    return (
      <PanelLayout
        loggedUser={loggedUser}
        loading={loading}
        panel={panel}
        breadcrumbs={breadcrumbs}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <QueriesContainer panel={panel} accessToken={accessToken} />
          </Grid>
          <Grid item xs={12} md={3}>
            <DocumentsContainer />
          </Grid>
          <Grid item xs={12} md={3}>
            <BulletinsContainer />
          </Grid>
        </Grid>
      </PanelLayout>
    );
  }

  private loadData = async () => {
    const {
      panelSlug,
      accessToken: { token }
    } = this.props;

    try {
      const panels = await api.getPanelsService(token).listPanels({
        urlName: panelSlug
      });

      const panel = panels.length ? panels[0] : undefined;
      if (!panel || !panel.id) {
        // TODO: handle panel not found gracefully
        throw new Error("Could not find panel");
      }

      const loggedUser = await api
        .getUsersService(this.props.accessToken.token)
        .findUser({
          userId: this.props.accessToken.userId
        });

      this.setState({
        panel,
        loggedUser,
        loading: false
      });
    } catch (error) {
      // TODO: error handling
      // tslint:disable-next-line: no-console
      console.error(error);
    }
  };
}

/**
 * Redux mapper for mapping store state to component props
 *
 * @param state store state
 */
function mapStateToProps(state: StoreState) {
  return {
    accessToken: state.accessToken as AccessToken
  };
}

export default withRouter(connect(mapStateToProps)(PanelPage) as any);
