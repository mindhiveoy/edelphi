import * as React from "react";
// import * as actions from "../../actions";
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
import { QueryPage } from "../../generated/client/models/QueryPage";
import PageLayout from "../../components/panel/PageLayout";
import * as queryString from "query-string";

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
  pages?: QueryPage[];

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

      const pages = await api.getQueryPagesService(token).listQueryPages({
        includeHidden: false,
        panelId: panel.id,
        queryId: query.id
      });

      // TODO Move loggeduser into context
      const loggedUser = await api.getUsersService(token).findUser({
        userId: this.props.accessToken.userId
      });

      this.setState({
        loading: false,
        panel,
        query,
        pages,
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
    const {
      panel,
      query,
      pages,
      loggedUser,
      error,
      loading,
      redirectTo
    } = this.state;

    // TODO make this more efficient
    const pageNo = this.parsePageNo();

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

    const { accessToken } = this.props;

    // TODO verify query.state !== defined

    return (
      <PanelLayout
        loggedUser={loggedUser}
        breadcrumbs={breadcrumbs}
        loading={loading}
        panel={panel}
        redirectTo={redirectTo}
      >
        {/* <div>
          {panelSlug} / {querySlug}
        </div> */}
        <PageLayout panel={panel} query={query} pages={pages} pageNo={pageNo} />
        <QueryNavigation
          accessToken={accessToken}
          queryState={query.state!}
          pages={pages}
          panel={panel}
          query={query}
          pageNo={pageNo}
          onPageChange={this.handlePageChange}
          location={this.props.location}
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

  private parsePageNo = () => {
    const queryParams = queryString.parse(this.props.location.search);

    try {
      return queryParams.page ? parseInt(queryParams.page as string, 0) : 0;
    } catch (error) {
      // tslint:disable-next-line: no-console
      console.error(error);
      // TODO page not found
      return 0;
    }
  };

  private handlePageChange = (event: PageChangeEvent) => {
    // alert("Buum!");
    // tslint:disable-next-line: no-console
    console.debug(event);
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

export default withRouter(connect(mapStateToProps)(QueryScreen) as any);
