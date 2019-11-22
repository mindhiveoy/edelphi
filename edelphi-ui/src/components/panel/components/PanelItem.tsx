import React from "react";
import styled from "@emotion/styled";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton, Button } from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Query } from "../../../generated/client";

const Base = styled.div`
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;

  :last-child {
    border-bottom: 0px;
  }
`;
const Header = styled.div`
  width: 100%;
  font-size: 1.15em;
  color: #ff6600;
  padding-bottom: 10px;
  text-decoration: underline;
  cursor: pointer;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
`;

// TODO: truncate text. Max 5 rows.s
const Description = styled.div``;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9em;
  color: #666;
  padding-top: 5px;
`;

interface PanelItemProps {
  data: any; // TODO: update interface
  modifyOnClickHandler?: () => void;
  deleteOnClickHandler?: () => void;
  copyOnClickHandler?: () => void;
  hideOnClickHandler?: () => void;
  continueAnsweringOnClickHandler?: () => void;
}

export default class PanelItem extends React.Component<PanelItemProps> {
  public render() {
    const {
      data,
      modifyOnClickHandler,
      deleteOnClickHandler,
      copyOnClickHandler,
      hideOnClickHandler,
      continueAnsweringOnClickHandler
    } = this.props;

    const title = data && data.name ? data.name : "";
    const description = data && data.description ? data.description : "-";

    return (
      <Base>
        <HeaderContainer>
          <Header>{title}</Header>
          <Buttons>
            {copyOnClickHandler && (
              <IconButton
                aria-label="hide"
                size="small"
                onClick={hideOnClickHandler}
              >
                <VisibilityIcon fontSize="inherit" />
              </IconButton>
            )}
            {copyOnClickHandler && (
              <IconButton
                aria-label="copy"
                size="small"
                onClick={copyOnClickHandler}
              >
                <FileCopyIcon fontSize="inherit" />
              </IconButton>
            )}
            <IconButton
              aria-label="modify"
              size="small"
              onClick={modifyOnClickHandler}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={deleteOnClickHandler}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Buttons>
        </HeaderContainer>
        <Description>{description}</Description>
        <Footer>
          {this.getFooterText()}
          {continueAnsweringOnClickHandler && (
            <Button variant="contained" color="primary">
              JATKA VASTAAAMISTA
            </Button>
          )}
        </Footer>
      </Base>
    );
  }

  /**
   * Get footer text
   * TODO: do this when we know what backend returns
   */
  private getFooterText = () => {
    return "Luotu 21.11.2019, muokattu 21.11.2019";
  };
}
