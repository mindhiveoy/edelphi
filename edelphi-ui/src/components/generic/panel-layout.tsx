import * as React from "react";
import { Redirect } from "react-router-dom";
import HeaderBackground from "../../gfx/header_background.png";
import "../../styles/generic.scss";
import {
  SemanticShorthandCollection,
  BreadcrumbSectionProps
} from "semantic-ui-react";
import strings from "../../localization/strings";
import { Panel, User } from "../../generated/client";
import { CircularProgress, Container, Grid, Box } from "@material-ui/core";

interface Props {
  redirectTo?: string;
  panel?: Panel;
  loading?: boolean;
  loggedUser: User;
  breadcrumbs: SemanticShorthandCollection<BreadcrumbSectionProps>;
}

/**
 * Generic layout for panel admin
 */
class PanelLayout extends React.Component<Props> {
  public componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  public render() {
    if (this.props.redirectTo) {
      return <Redirect to={this.props.redirectTo} />;
    }

    if (!this.props.panel || this.props.loading) {
      return <CircularProgress />;
    }

    return (
      <div>
        {this.renderHeader()}
        {this.props.children}
      </div>
    );
  }

  private renderHeader = () => {
    return (
      <header style={{ backgroundImage: `url(${HeaderBackground})` }}>
        <Container>
          <Grid container>
            <Grid item xs={12}>
              <Box textAlign="center">{this.renderLocaleChange()}</Box>
            </Grid>
            <Grid xs={6}>{this.renderTitle()}</Grid>
            <Grid xs={6}>
              <Box textAlign="right">{this.renderProfileDetails()}</Box>
            </Grid>
          </Grid>
        </Container>
      </header>
    );
  };

  /**
   * Renders title
   */
  private renderTitle = () => {
    if (!this.props.panel) {
      return null;
    }

    return (
      <h1 className="header-title">
        <a className="root-link" href="/">
          eDelphi.org
        </a>
        <a className="panel-link" href={"/" + this.props.panel.urlName}>
          {this.props.panel.name}
        </a>
      </h1>
    );
  };

  /**
   * Renders back link
   */
  private renderNavigation = () => {
    if (!this.props.panel) {
      return null;
    }

    return (
      <nav className="header-nav">
        <a href={`/${this.props.panel.urlName}`} className="header-nav-link">
          {strings.panelAdmin.navigation.panel}
        </a>
        <a
          href={`/panel/admin/dashboard.page?panelId=${this.props.panel.id}`}
          className="header-nav-link header-nav-link-selected"
        >
          {strings.panelAdmin.navigation.administration}
        </a>
        <a
          href={`/panel/reportissue.page?panelId=${this.props.panel.id}`}
          className="header-nav-link"
        >
          {strings.panelAdmin.navigation.reportAnIssue}
        </a>
      </nav>
    );
  };

  /**
   * Renders locale change links
   */
  private renderLocaleChange = () => {
    const selectedLanguage = strings.getLanguage();

    return (
      <div>
        <a
          className={
            selectedLanguage === "fi"
              ? "header-locale-link header-locale-link-selected"
              : "header-locale-link"
          }
          href={window.location.href}
          onClick={this.onLocaleChangeFiClick}
        >
          Suomeksi
        </a>
        <a
          className={
            selectedLanguage === "en"
              ? "header-locale-link header-locale-link-selected"
              : "header-locale-link"
          }
          href={window.location.href}
          onClick={this.onLocaleChangeEnClick}
        >
          In English
        </a>
      </div>
    );
  };

  /**
   * Renders profile details
   */
  private renderProfileDetails = () => {
    return (
      <div
        style={{
          display: "flex",
          textAlign: "right",
          color: "#fff",
          justifyContent: "flex-end"
        }}
      >
        <div>
          <div>
            {strings.formatString(
              strings.generic.welcomeUser,
              `${this.props.loggedUser.firstName} ${this.props.loggedUser.lastName}`
            )}
          </div>
          <div>
            <a style={{ color: "#87d0ff" }} href="/profile.page">
               {strings.generic.profileLink}
            </a>
          </div>
          <div>
            <a style={{ color: "#87d0ff" }} href="/logout.page">
              {" "}
              {strings.generic.logoutLink}{" "}
            </a>
          </div>
        </div>
        <div>{this.renderProfileImage()}</div>
      </div>
    );
  };

  /**
   * Renders profile image
   */
  private renderProfileImage = () => {
    if (!this.props.loggedUser.profileImageUrl) {
      return (
        <div
          style={{
            margin: "5px 0px 0px 15px",
            width: "65px",
            height: "65px",
            float: "right",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "contain",
            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#186089"
          }}
        ></div>
      );
    }

    return (
      <img
        alt={strings.generic.profileImageAlt}
        style={{ maxWidth: "65px", maxHeight: "58px" }}
        src={this.props.loggedUser.profileImageUrl}
      />
    );
  };

  /**
   * Changes legacy UI locale
   *
   * @param locale locale
   */
  private changeLegacyLocale = async (locale: string) => {
    const date = new Date();
    date.setTime(date.getTime() + 3650 * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = "eDelphiLocale=" + locale + expires + "; path=/";
    await (await fetch(`/locale/setlocale.json?locale=${locale}`)).json();
  };

  /**
   * Changes locale
   *
   * @param locale locale
   */
  private changeLocale = async (locale: string) => {
    await this.changeLegacyLocale(locale);
    // TODO: locale to redux
    window.location.reload(true);
  };

  /**
   * Event handler for locale fi link click
   *
   * @param event event
   */
  private onLocaleChangeFiClick = async (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    await this.changeLocale("fi");
  };

  /**
   * Event handler for locale en link click
   *
   * @param event event
   */
  private onLocaleChangeEnClick = async (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    await this.changeLocale("en");
  };
}

export default PanelLayout;
