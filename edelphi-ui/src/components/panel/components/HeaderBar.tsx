import React from "react";
import styled from "@emotion/styled";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { IconButton } from "@material-ui/core";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";

const Container = styled.div`
  background-color: #1b628a;
  color: #fff;
  padding: 8px;
  text-transform: uppercase;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconBtn = styled(IconButton)`
  color: #fff;
`;

const Buttons = styled.div`
  display: flex;
`;

interface HeaderBarProps {
  title: string;
  googleDriveOnClickHandler?: () => void;
  addIconOnClickHandler?: () => void;
}

export default class HeaderBar extends React.Component<HeaderBarProps> {
  public render() {
    const {
      title,
      addIconOnClickHandler,
      googleDriveOnClickHandler
    } = this.props;

    return (
      <Container>
        {title}
        <Buttons>
          {googleDriveOnClickHandler && (
            <IconBtn
              aria-label="add"
              size="small"
              onClick={googleDriveOnClickHandler}
            >
              <InsertDriveFileIcon fontSize="inherit" />
            </IconBtn>
          )}
          {addIconOnClickHandler && (
            <IconBtn
              aria-label="add"
              size="small"
              onClick={addIconOnClickHandler}
            >
              <NoteAddIcon fontSize="inherit" />
            </IconBtn>
          )}
        </Buttons>
      </Container>
    );
  }
}
