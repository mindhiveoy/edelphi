import React from "react";
import { Base, Content, NoItems } from "../components/styled-components";
import HeaderBar from "../components/HeaderBar";
import PanelItem from "../components/PanelItem";
import CircularProgressLoader from "../../CircularProgressLoader";

const mockData = [
  {
    id: 1,
    name: "Document 1",
    description:
      "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting indust"
  },
  {
    id: 3,
    name: "Document 1",
    description:
      "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting indust"
  }
];

interface State {
  data?: any[];
  loading: boolean;
}

export default class DocumentsContainer extends React.Component<any, State> {
  public state: State = {
    loading: true
  };

  public componentDidMount() {
    // TODO: get data from rest
    this.setState({
      loading: false,
      data: mockData
    });
  }

  public render() {
    const { data } = this.state;

    return (
      <Base>
        <HeaderBar
          title="Documents"
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
          data.map(item => <PanelItem key={item.id} data={item} />)
        ) : (
          <NoItems>Paneelissa ei ole julkaistu yhtään dokumenttia</NoItems>
        )}
      </>
    );
  };

  /**
   * Add new document
   * TODO: link this to backend
   */
  private addIconClickHandler = () => {
    alert("Add new document");
  };
}
