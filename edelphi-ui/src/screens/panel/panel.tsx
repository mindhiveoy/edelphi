import React from "react";
import PanelLayout from "../../components/generic/panel-layout";
import api from "../../api/api";
import { StoreState, WithAccessToken } from "../../types";
import { User, Panel } from "../../generated/client";
import { SemanticShorthandCollection } from "semantic-ui-react/dist/commonjs/generic";
import { BreadcrumbSectionProps } from "semantic-ui-react";
import strings from "../../localization/strings";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import DocumentsContainer from "../../components/panel/documents";
import QueriesContainer from "../../components/panel/queries";
import BulletinsContainer from "../../components/panel/bulletins";
import { withRouter, RouteComponentProps } from "react-router";

interface PanelPageProps {
  panelSlug: string;
  querySlug: string;
}

interface State {
  loading: boolean;
  loggedUser?: User;
  panel?: Panel;
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
        <Grid container>
          <Grid item xs={4}>
            <DocumentsContainer />
          </Grid>
          <Grid item xs={4}>
            <QueriesContainer />
          </Grid>
          <Grid item xs={4}>
            <BulletinsContainer />
          </Grid>
        </Grid>
      </PanelLayout>
    );
  }

  private loadData = async () => {
    const { accessToken } = this.props;
    if (!(accessToken && accessToken.token)) {
      return;
    }
    const token = accessToken.token;

    const panels = await api.getPanelsService(token).listPanels({
      urlName: this.props.panelSlug
    });

    const panel = panels.length ? panels[0] : undefined;
    if (!panel || !panel.id) {
      throw new Error("Could not find panel");
    }

    const loggedUser = await api.getUsersService(token).findUser({
      userId: accessToken.userId
    });

    this.setState({
      loading: false,
      panel,
      loggedUser
    });
  };
}

function mapStateToProps(state: StoreState, ownProps: PanelPageProps) {
  return {
    ...ownProps,
    accessToken: state.accessToken
  };
}

export default withRouter<RouteComponentProps<any>, any>(
  connect(mapStateToProps)(PanelPage)
);
