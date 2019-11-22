import * as React from "react";
import { PageComponentTypeProps } from "../PageComponent";

export class TextPageComponent extends React.Component<
  PageComponentTypeProps,
  any
> {
  public render() {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: this.props.data.content || "" }}
      />
    );
  }
}
