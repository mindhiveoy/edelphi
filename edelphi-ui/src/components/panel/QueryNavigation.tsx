import * as React from "react";
import * as actions from "../../actions";
import { StoreState, PageChangeEvent } from "../../types";
import { connect, DispatchProp } from "react-redux";
import { Segment, Dimmer, Loader } from "semantic-ui-react";
import strings from "../../localization/strings";
import { QueryState, QueryPage, Panel, Query } from "../../generated/client";
import { AccessToken } from "../../types/index";
import ErrorDialog from "../error-dialog";
import styled from "@emotion/styled";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withWidth, Paper } from "@material-ui/core";
import Grow from "@material-ui/core/Grow";
import ArrowUpIcon from "@material-ui/icons/ArrowDropUp";
import { isWidthUp, WithWidth } from "@material-ui/core/withWidth";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Typography from "@material-ui/core/Typography";
import { withRouter, RouteComponentProps } from "react-router";
import { QueryRouteParams } from "../../screens/panel/query";
import { Link } from "react-router-dom";

const PICKMENU_ID = "pick-page-menu";
/**
 * Interface representing component properties
 */
interface Props {
  accessToken: AccessToken;
  pageNo: number;
  panel: Panel;
  query: Query;
  pages: QueryPage[];
  queryState: QueryState;
  queryValidationMessage: string | null;
  onPageChange: (event: PageChangeEvent) => void;
  queryValidationMessageUpdate: (queryValidationMessage: string | null) => void;
}

const NavigationPanel = styled(Grid)`
  margin-top: 10px;
  border-top: 1px solid #000;
  padding-top: 16px;
`;

// eslint-disable-next-line
const NavigationCell = styled(({ mediumAlign, ...props }) => (
  <Grid {...props} />
))`
  text-align: ${props =>
    isWidthUp("sm", props.width) ? props.mediumAlign : "center"};
`;

const ValidationMessage = styled.p`
  color: red;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
`;

const PickPageButton = styled(Button)`
  margin: 0;
  padding-top: 0;
  text-align: center;
  margin-bottom: 5px;
`;

const PickIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledListItem = styled(ListItem)`
  ":hover": {
    background-color: rgba(192, 192, 192, 0.7);
  }
  padding-left: 0;
`;

const StyledListItemText = styled(ListItemText)`
  text-decoration: none;

  min-width: ${window && Math.min(window.innerWidth - 20, 400)}px;
  display: inline-block;
  margin-left: 10px;
  margin-right: 10px;
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
  background-color: white;
`;

const QueryAnchor = styled(Link)`
  display: flex;
  flex-direction: row;
  text-decoration: none;
  color: blue;
  ':visited':blue ;
`;

// TODO text color from theme
const PageNoDiv = styled(Typography)`
  width: 1rem;
  padding-left: 4px;
  text-align: left;
  color: black;
  ':visited':black ;
  margin-top: 4px;
  margin-bottom: 4px;
`;
/**
 * Interface representing component state
 */
interface State {
  // loading: boolean;
  nextSaving: boolean;
  previousSaving: boolean;
  pagesOpen: boolean;
  error?: Error;
  anchorEl: any;
  /**
   * True when query pick up menu is open
   */
  pagePickerOpen: boolean;
}

/**
 * React component for query navigation
 */
class QueryNavigation extends React.Component<
  Props & DispatchProp<any> & WithWidth & RouteComponentProps<QueryRouteParams>,
  State
> {
  public state: State = {
    // loading: true,
    nextSaving: false,
    previousSaving: false,
    pagesOpen: false,
    pagePickerOpen: false,
    anchorEl: null
  };

  /**
   * Render edit pest view
   */
  public render() {
    const { error, previousSaving, nextSaving, anchorEl } = this.state;
    if (error) {
      return <ErrorDialog error={error} onClose={this.handleCloseError} />;
    }
    const {
      queryState,
      queryValidationMessage,
      width,
      pages,
      pageNo
    } = this.props;

    // TODO Separate loader component
    if (!pages) {
      return (
        <Segment style={{ minHeight: "200px" }}>
          <Dimmer inverted active>
            <Loader>{strings.generic.loading}</Loader>
          </Dimmer>
        </Segment>
      );
    }
    const currentPage = this.getCurrentPage(pageNo);
    const nextPage = this.getNextPage(pageNo);
    const previousPage = this.getPreviousPage(pageNo);

    if (!currentPage) {
      return null;
    }

    const nextDisabled =
      queryState !== "ACTIVE" ||
      !!queryValidationMessage ||
      previousSaving ||
      nextSaving;
    const previousDisabled = !previousPage || previousSaving || nextSaving;
    const skipDisabled = !nextPage || previousSaving || nextSaving;

    return (
      <NavigationPanel container>
        <NavigationCell
          width={width}
          mediumAlign="right"
          item
          xs={3}
          sm={4}
          md={5}
        >
          <Button
            disabled={previousDisabled}
            variant="contained"
            color="primary"
            onClick={this.onPreviousClick}
          >
            {strings.panel.query.previous}
            {previousSaving && (
              <Loader
                style={{ marginLeft: "10px" }}
                active
                inline
                size="mini"
                inverted
              />
            )}
          </Button>
        </NavigationCell>
        <NavigationCell
          width={width}
          mediumAlign="center"
          item
          xs={6}
          sm={4}
          md={2}
        >
          <PickPageButton
            onClick={event =>
              this.setState({
                anchorEl: event.currentTarget
              })
            }
            aria-controls={PICKMENU_ID}
            aria-haspopup="true"
            aria-describedby={PICKMENU_ID}
          >
            <PickIcon>
              <ArrowUpIcon />
              {pageNo + 1} / {pages.length}
            </PickIcon>
          </PickPageButton>

          <Popper
            id={PICKMENU_ID}
            open={anchorEl !== null}
            anchorEl={anchorEl}
            transition
            placement="top"
          >
            {({ TransitionProps }) => (
              <Grow in={anchorEl !== null} {...TransitionProps} timeout={350}>
                <ClickAwayListener onClickAway={this.handlePagePickerClose}>
                  {this.renderPagePickMenu()}
                </ClickAwayListener>
              </Grow>
            )}
          </Popper>
        </NavigationCell>
        <NavigationCell
          width={width}
          mediumAlign="left"
          item
          xs={3}
          sm={4}
          md={5}
        >
          <Button
            disabled={nextDisabled}
            variant="contained"
            color="primary"
            onClick={this.onNextClick}
          >
            {nextPage ? strings.panel.query.next : strings.panel.query.save}
            {this.state.nextSaving && (
              <Loader
                style={{ marginLeft: "10px" }}
                active={true}
                inline
                size="mini"
                inverted
              />
            )}
          </Button>
        </NavigationCell>
        <NavigationCell width={width} mediumAlign="center" item xs={12}>
          <Button disabled={skipDisabled} onClick={this.onSkipClick}>
            {strings.panel.query.skip}
          </Button>
        </NavigationCell>
      </NavigationPanel>
    );
  }

  private handleCloseError = () => {
    this.setState({
      error: undefined
    });
  };

  // TODO Disabled message
  /**
   * Renders disabled message
   */
  private renderDisabledMessage = () => {
    if (!this.props.queryValidationMessage) {
      return null;
    }

    return (
      <Grid item xs={12}>
        <ValidationMessage>
          {this.props.queryValidationMessage}
        </ValidationMessage>
      </Grid>
    );
  };

  private handlePagePickerClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  /**
   * Renders page picker menu shown, when the user wants to jump
   * between pages without saving.
   */
  private renderPagePickMenu = () => {
    const {
      pages,
      location: { pathname }
    } = this.props;
    return (
      <StyledPaper elevation={6}>
        <Typography variant="h2">
          {strings.panel.query.quickNavigationTitle}
        </Typography>
        <List>
          {pages.map(page => (
            <StyledListItem button key={`list-${page.id}`}>
              <QueryAnchor
                key={`link-${page.id}`}
                to={`${pathname}?page=${page.pageNumber}`}
                onClick={this.handlePagePickerClose}
              >
                <PageNoDiv variant="body1">{page.pageNumber + 1}</PageNoDiv>
                <StyledListItemText primary={page.title} />
              </QueryAnchor>
            </StyledListItem>
          ))}
        </List>
      </StyledPaper>
    );
  };

  /**
   * Locates legacy form
   *
   * TODO Find out is this necessary anymore
   */
  private getLegacyForm = () => {
    const queryBlock = document.getElementById("panelQueryBlock");
    if (queryBlock) {
      const forms = queryBlock.getElementsByTagName("form");
      if (forms.length === 1) {
        return forms[0];
      }
    }

    return null;
  };

  /**
   * Saves legacy form
   */
  private saveLegacyForm = (finish: boolean) => {
    // TODO find out is this needed anymore
    // const form = this.getLegacyForm();
    // if (!form) {
    //   throw new Error("Failed to locate legacy form");
    // }
    // return new Promise((resolve, reject) => {
    //   JSONUtils.sendForm(form, {
    //     onSuccess(jsonResponse: any) {
    //       if (finish) {
    //         JSONUtils.request("/queries/finishquery.json", {
    //           parameters: {
    //             replyId: form.queryReplyId.value
    //           },
    //           onSuccess(response: any) {
    //             resolve(response);
    //           },
    //           onFailure(response: any) {
    //             reject(response);
    //           }
    //         });
    //       } else {
    //         resolve(jsonResponse);
    //       }
    //     },
    //     onFailure(jsonResponse: any) {
    //       reject(jsonResponse);
    //     }
    //   });
    // });
  };

  /**
   * Handles page change click event
   */
  private changePage = async (
    page: QueryPage | null,
    save: boolean,
    finish: boolean
  ) => {
    const { onPageChange, panel } = this.props;

    onPageChange && onPageChange({});

    if (save) {
      // TODO verify the need for this
      await this.saveLegacyForm(finish);
    }

    await this.promiseAwait(500);

    if (page) {
      this.props.history.push(
        this.props.location.pathname + `?page=${page.pageNumber}`
      );
    } else if (finish && panel) {
      this.props.history.push(
        this.props.location.pathname + `/${panel.urlName}`
      );
    }

    this.setState({
      previousSaving: false,
      nextSaving: false
    });
  };

  /**
   * Returns current page
   *
   * @returns current page or null if not found
   */
  private getCurrentPage = (pageNo: number) => {
    return this.getPageByNo(pageNo);
  };

  /**
   * Returns previous page
   *
   * @returns previous page or null if not available
   */
  private getPreviousPage = (pageNo: number) => {
    const { pages } = this.props;
    const currentIndex = pages.findIndex(page => {
      return page.pageNumber === pageNo;
    });

    return currentIndex > 0 ? pages[currentIndex - 1] : null;
  };

  /**
   * Returns next page
   *
   * @returns next page or null if not available
   */
  private getNextPage = (pageNo: number) => {
    const { pages } = this.props;
    const currentIndex = pages.findIndex(page => {
      return page.pageNumber === pageNo;
    });

    if (currentIndex < pages.length - 1) {
      return pages[currentIndex + 1];
    }
    return null;
  };

  /**
   * Resolves promise after given  time
   */
  private promiseAwait = (timeout: number) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

  private getPageByNo(pageNo: number) {
    return this.props.pages.find(page => {
      return page.pageNumber === pageNo;
    });
  }

  /**
   * Event handler for previous button click
   *
   * @param event event
   */
  private onPreviousClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    this.setState({
      previousSaving: true
    });

    const previousPage = this.getPreviousPage(this.props.pageNo);

    await this.changePage(previousPage, true, false);
  };

  /**
   * Event handler for next button click
   *
   * @param event event
   */
  private onNextClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    this.setState({
      nextSaving: true
    });

    const nextPage = this.getNextPage(this.props.pageNo);

    await this.changePage(nextPage, true, !nextPage);
  };

  /**
   * Event handler for skip button click
   *
   * @param event event
   */
  private onSkipClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const nextPage = this.getNextPage(this.props.pageNo);

    await this.changePage(nextPage, false, false);
  };
}

/**
 * Redux mapper for mapping store state to component props
 *
 * @param state store state
 */
function mapStateToProps(state: StoreState, ownProps: Partial<Props>) {
  return {
    ...ownProps,
    queryValidationMessage: state.queryValidationMessage || null,
    accessToken: state.accessToken || "",
    locale: state.locale
  };
}

/**
 * Redux mapper for mapping component dispatches
 *
 * @param dispatch dispatch method
 */
function mapDispatchToProps(dispatch: React.Dispatch<actions.AppAction>) {
  return {
    queryValidationMessageUpdate: (queryValidationMessage: string | null) =>
      dispatch(actions.queryValidationMessageUpdate(queryValidationMessage))
  };
}

export default withRouter(
  withWidth()(
    connect(mapStateToProps, mapDispatchToProps)(QueryNavigation as any) as any
  ) as any
) as any;
