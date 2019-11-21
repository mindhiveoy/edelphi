export const MOCK_API = true;

const mocks: { [fileName: string]: any } = {
  findPanel: {
    id: 24905,
    name: "ville-testi",
    urlName: "ville-testi",
    accessLevel: "CLOSED",
    state: "IN_PROGRESS"
  },

  findUser: {
    id: "1e78fa2d-be2b-4e1d-b57e-49d0a5ac432b",
    firstName: "Testi",
    lastName: "Käyttäjä",
    profileImageUrl: null
  },

  listQueries: [
    {
      id: 42916,
      allowEditReply: true,
      closes: null,
      state: "ACTIVE",
      name: "kysymykset",
      urlName: "kysymykset",
      visible: true,
      description: null,
      creatorId: "1e78fa2d-be2b-4e1d-b57e-49d0a5ac432b",
      lastModifierId: "1e78fa2d-be2b-4e1d-b57e-49d0a5ac432b",
      created: "2019-11-19T19:04:19.891Z",
      lastModified: "2019-11-19T19:05:51.609Z"
    }
  ],

  listQueryPages: [
    {
      id: 18575,
      pageNumber: 0,
      title: "Testisivu",
      type: "TEXT",
      commentOptions: {
        commentable: false,
        discussionVisible: false,
        categories: []
      }
    }
  ],
  listPanels: [
    {
      id: 24905,
      name: "ville-testi",
      urlName: "ville-testi",
      description: null,
      accessLevel: "CLOSED",
      state: "DESIGN"
    }
  ]
};

export function getMockApiFile(fileName: string): Promise<any> {
  return new Promise<any>(resolve => {
    resolve(mocks[fileName] as any);
  });
}
