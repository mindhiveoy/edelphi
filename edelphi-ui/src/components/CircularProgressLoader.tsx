import React from "react";
import styled from "@emotion/styled";
import { CircularProgress } from "@material-ui/core";
import { CircularProgressProps } from "@material-ui/core/CircularProgress";

const Base = styled.div`
  display: flex;
  min-height: 300px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export default (props: CircularProgressProps) => (
  <Base>
    <CircularProgress {...props} />
  </Base>
);
