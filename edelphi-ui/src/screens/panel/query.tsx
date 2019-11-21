import * as React from "react";
import * as actions from "../../actions";
import PanelLayout from "../../components/generic/panel-layout";
import { User, Panel, Query } from "../../generated/client";
import {
  SemanticShorthandCollection,
  BreadcrumbSectionProps
} from "semantic-ui-react";
import strings from "../../localization/strings";
import ErrorDialog from "../../components/error-dialog";
import api from "../../api/api";
import { PageChangeEvent, StoreState, AccessToken } from "../../types";
import { connect, DispatchProp } from "react-redux";
import QueryNavigation from "../../components/panel/QueryNavigation";
// import QueryComments from "../../components/panel/QueryComments";
import { RouteComponentProps, withRouter } from "react-router";

export interface QueryRouteParams {
  panelSlug: string;
  querySlug: string;
}
/**
 * Interface representing component properties
 */
interface Props
  extends DispatchProp<any>,
    RouteComponentProps<QueryRouteParams> {
  accessToken: AccessToken;
  panelSlug: string;
  querySlug: string;
}

/**
 * Interface representing component state
 */
interface State {
  loading: boolean;
  error?: Error;
  loggedUser?: User;
  panel?: Panel;
  query?: Query;
  redirectTo?: string;
}

/**
 * QueryPage component
 */
class QueryScreen extends React.Component<Props, State> {
  public state: State = {
    loading: false
  };
  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = async () => {
    this.setState({
      loading: true
    });

    const {
      panelSlug,
      querySlug,
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

      const queries = await api.getQueriesService(token).listQueries({
        panelId: panel.id,
        urlName: querySlug
      });

      const query = queries.length ? queries[0] : undefined;
      if (!query || !query.id) {
        // TODO: handle query not found gracefully
        throw new Error("Could not find query");
      }

      const loggedUser = await api.getUsersService(token).findUser({
        userId: this.props.accessToken.userId
      });

      this.setState({
        loading: false,
        panel,
        query,
        loggedUser
      });
    } catch (error) {
      this.setState({
        loading: false,
        error
      });
    }
  };

  /**
   * Component render method
   */
  public render() {
    const { panel, query, loggedUser, error, loading, redirectTo } = this.state;

    if (!(panel && query && loggedUser)) {
      return null;
    }

    if (error) {
      return <ErrorDialog error={error} onClose={this.handleCloseError} />;
    }

    const breadcrumbs: SemanticShorthandCollection<BreadcrumbSectionProps> = [
      { key: "home", content: strings.generic.eDelphi, href: "/" },
      {
        key: "panel",
        content: panel.name,
        href: `/${panel.urlName}`
      },
      { key: "query", content: query.name, active: true }
    ];

    const {
      accessToken,
      match: {
        params: { panelSlug, querySlug }
      }
    } = this.props;

    // TODO verify query.state !== defined

    return (
      <PanelLayout
        loggedUser={loggedUser}
        breadcrumbs={breadcrumbs}
        loading={loading}
        panel={panel}
        redirectTo={redirectTo}
      >
        <div>
          {panelSlug} / {querySlug}
        </div>
        <QueryNavigation
          accessToken={accessToken}
          queryState={query.state!}
          pageId={18575}
          panelId={panel.id!}
          queryId={query.id!}
          onPageChange={this.handlePageChange}
        />
        {/*
        <QueryComments
          setPageChangeListener={this.handlePageChange}
          panelId={panel.id}
          canManageComments
          viewDiscussion
          commentable
          pageId={0}
          queryId={query.id}
          queryReplyId={1}
        /> */}
      </PanelLayout>
    );
  }

  private handlePageChange = (event: PageChangeEvent) => {
    alert("Buum!");
  };

  private handleCloseError = () => this.setState({ error: undefined });
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

/**
 * Redux mapper for mapping component dispatches
 *
 * @param dispatch dispatch method
 */
function mapDispatchToProps(dispatch: React.Dispatch<actions.AppAction>) {
  return {};
} // TODO remove this as obsole

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(QueryScreen) as any
);
