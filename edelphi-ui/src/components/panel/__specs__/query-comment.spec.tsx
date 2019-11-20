import React from "react";
import { shallow } from "enzyme";
import { QueryCommentClass } from "../query-comment";

describe("QueryComment", () => {
  it("Renders the comment", () => {
    const queryComment = shallow(
      <QueryCommentClass
        locale="fi"
        panelId={1}
        queryId={2}
        pageId={3}
        queryReplyId={4}
        canManageComments
        category={null}
        comment={{
          queryPageId: 1,
          queryReplyId: 2,
          contents: "Ei pidä paikkaansa"
        }}
      />
    );
    expect(queryComment).toMatchSnapshot();
  });
});
