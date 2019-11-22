import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { QueryRouteParams } from "../../screens/panel/query";
import { Panel } from "../../generated/client/models/Panel";
import { Query } from "../../generated/client/models/Query";
import { QueryPage } from "../../generated/client/models/QueryPage";
import { Typography } from "@material-ui/core";
import PageComponent from "./PageComponent";

export interface PageLayoutProps {
  panel: Panel;
  query?: Query;
  pages?: QueryPage[];
  pageNo: number;
}
class PageLayout extends React.Component<
  PageLayoutProps & RouteComponentProps<QueryRouteParams>,
  any
> {
  public render() {
    const { panel, pages, query } = this.props;

    if (!pages) {
      return <div>Loading page...</div>;
    }
    const page = this.getPage();
    if (!page) {
      // TODO proper error page or exception
      return <div>Page not found...</div>;
    }
    return (
      <>
        <Typography variant="h2">{page.title}</Typography>
        <PageComponent panel={panel} query={query!} page={page} />
      </>
    );
  }

  private getPage = (): QueryPage | undefined => {
    const { pages, pageNo } = this.props;
    if (!pages || !pages.length || pageNo >= pages.length) {
      return undefined;
    }
    return pages[pageNo];
  };
}

export default withRouter(PageLayout);
