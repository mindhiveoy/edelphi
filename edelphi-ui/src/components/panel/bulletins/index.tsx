import React from "react";
import { Base, Content, NoItems } from "../components/styled-components";
import HeaderBar from "../components/HeaderBar";
import PanelItem from "../components/PanelItem";
import CircularProgressLoader from "../../CircularProgressLoader";

const mockData = [
  {
    id: 1,
    name: "Tiedote 1",
    description:
      "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a"
  },
  {
    id: 2,
    name: "Tiedote 2 ajdhkja dsfkjha sdkjfhaks fkj ",
    description:
      "What is Lorem Ipsum? Lorem Ipsum is simply dsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a"
  },
  {
    id: 3,
    name: "Tiedote 3",
    description:
      "What is Lorem Ipsum? Lorem Ipnter took a galley of type and scrambled it to make"
  },
  {
    id: 4,
    name:
      "Tiedote pitkä teksti teksti teksti teksti teksti teksti teksti teksti",
    description:
      "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetti galley of type and scrambled it to make a"
  }
];

interface State {
  data?: any[];
  loading: boolean;
}

export default class BulletinsContainer extends React.Component<any, State> {
  public state: State = {
    loading: true
  };

  public componentDidMount() {
    // TODO: get data from rest
    // Only for testing
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
          title="Tiedotteet"
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
            />
          ))
        ) : (
          <NoItems>Paneelissa ei ole julkaistu yhtään tiedotetta</NoItems>
        )}
      </>
    );
  };

  /**
   * Add new bulletin
   * TODO: link this to backend
   */
  private addIconClickHandler = () => {
    alert("Add new bulletin");
  };

  /**
   * Modify bulletin
   * TODO: link
   */
  private modifyOnClickHandler = () => {
    alert("TODO: modify item");
  };

  /**
   * Delete bulletin
   * TODO: link
   */
  private deleteOnClickHandler = () => {
    alert("TODO: delete item");
  };
}
