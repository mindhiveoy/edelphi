import * as React from "react";
import { Query } from "../../generated/client/models/Query";
import { QueryPage } from "../../generated/client/models/QueryPage";
import { QueryPageType } from "../../generated/client/models/QueryPageType";
import { TextPageComponent } from "./page-components/TextPageComponent";
import { connect } from "react-redux";
import { StoreState, WithAccessToken } from "../../types/index";
import { Panel } from "../../generated/client/models/Panel";
import { QueryPageText } from "../../generated/client/models/QueryPageText";
import api from "../../api/api";

export interface PageComponentProps {
  panel: Panel;
  query: Query;
  page: QueryPage;
}

export interface PageComponentTypeProps {
  panel: Panel;
  query: Query;
  page: QueryPage;
  data: QueryPageText;
}

interface State {
  loading: boolean;
  data?: QueryPageText;
}

class PageComponent extends React.Component<
  PageComponentProps & WithAccessToken,
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
      await this.loadData();
    }
  };

  public render() {
    const { page } = this.props;
    const { loading, data } = this.state;
    if (loading) {
      // TODO proper loader
      return "loading...";
    }
    if (!data) {
      return "page data not found";
    }

    switch (page.type) {
      case QueryPageType.TEXT:
        return this.renderTextPage();
      default:
        return <div>{page.type} not implemented yet</div>;
    }
  }

  private renderTextPage = () => {
    const { panel, query, page } = this.props;
    return (
      <TextPageComponent
        panel={panel}
        query={query}
        page={page}
        data={this.state.data!}
      />
    );
  };

  private loadData = async () => {
    const { accessToken, panel, page } = this.props;

    if (!(accessToken && accessToken.token && page.id)) {
      return;
    }
    try {
      const response = await api
        .getQueryPagesService(accessToken.token)
        .findQueryPageTextRaw({
          panelId: panel.id!,
          queryPageId: page.id
        });

      const data = await response.value();

      this.setState({
        loading: false,
        data
      });
    } catch (error) {
      // TODO proper error diagnostics
      // tslint:disable-next-line: no-console
      console.error(error);

      this.setState({
        loading: false
      });
    }
  };
}

const mapStateToProps = (state: StoreState, ownProps: PageComponentProps) => {
  return {
    ...ownProps,
    accessToken: state.accessToken
  };
};

export default connect(mapStateToProps)(PageComponent);
