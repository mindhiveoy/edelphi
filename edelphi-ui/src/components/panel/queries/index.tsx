import React from "react";
import { Base, Content, NoItems } from "../components/styled-components";
import HeaderBar from "../components/HeaderBar";
import CircularProgressLoader from "../../CircularProgressLoader";
import PanelItem from "../components/PanelItem";
import { Query, Panel } from "../../../generated/client";
import { AccessToken } from "../../../types";
import api from "../../../api/api";

interface QueriesContainerProps {
  panel?: Panel;
  accessToken: AccessToken;
}

interface State {
  data?: Query[];
  loading: boolean;
}

class QueriesContainer extends React.Component<QueriesContainerProps, State> {
  public state: State = {
    loading: true
  };

  public componentDidMount = async () => {
    const {
      accessToken: { token },
      panel
    } = this.props;

    if (!panel || !panel.id) {
      // TODO: handle no panel error
      return;
    }

    try {
      const queries = await api.getQueriesService(token).listQueries({
        panelId: panel.id
      });

      this.setState({
        data: queries,
        loading: false
      });
    } catch (error) {
      // TODO: error handling
      // tslint:disable-next-line: no-console
      console.error(error);
    }
  };

  public render() {
    return (
      <Base>
        <HeaderBar
          title="Kyselyt"
          addIconOnClickHandler={this.addIconClickHandler}
        />
        <Content>{this.getContent()}</Content>
      </Base>
    );
  }

  private getContent = () => {
    const { data, loading } = this.state;

    if (loading) {
      return <CircularProgressLoader />;
    }

    return (
      <>
        {data && data.length ? (
          data.map(item => (
            <PanelItem
              key={item.id}
              data={item}
              modifyOnClickHandler={this.modifyOnClickHandler}
              deleteOnClickHandler={this.deleteOnClickHandler}
              copyOnClickHandler={this.copyOnClickHandler}
              hideOnClickHandler={this.hideOnClickHandler}
              continueAnsweringOnClickHandler={
                this.continueAnsweringOnClickHandler
              }
            />
          ))
        ) : (
          <NoItems>Paneelissa ei ole julkaistu yhtään kyselyä</NoItems>
        )}
      </>
    );
  };

  /**
   * TODO: link this to backend
   */
  private addIconClickHandler = () => {
    alert("TODO: add");
  };

  /**
   * TODO: link this to backend
   */
  private modifyOnClickHandler = () => {
    alert("TODO: modify");
  };

  /**
   * TODO: link this to backend
   */
  private deleteOnClickHandler = () => {
    alert("TODO:delete");
  };

  /**
   * TODO: link this to backend
   */
  private copyOnClickHandler = () => {
    alert("TODO:copy");
  };

  /**
   * TODO: link this to backend
   */
  private hideOnClickHandler = () => {
    alert("TODO:hide");
  };

  /**
   * TODO: link this to backend
   */
  private continueAnsweringOnClickHandler = () => {
    alert("TODO:continue answering");
  };
}

export default QueriesContainer;
