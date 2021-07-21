export const mockUser = {
  id: 'some-id-here',
  role: 'CONSENTEE',
  name: 'Dayo Hugo',
};

export const mockConversation = {
  id: '1',
  status: 'EMPTY',
  members: {
    nodes: [
      {
        id: '1',
        memberId: 'some-id-here',
        memberType: 'CONSENTEE_RECIPIENT',
        name: 'Dayo Hugo',
      },
      {
        id: '2',
        memberId: 'other-id-here',
        memberType: 'USER',
        name: 'Marta',
      },
    ],
  },
  messages: {
    nodes: [
      { content: 'This is message 1', status: 'DEFAULT', author: { memberType: 'USER' } },
      { content: 'This is message 2', status: 'DEFAULT', author: { memberType: 'CONSENTEE_RECIPIENT' } },
      { content: 'This is message 3', status: 'DEFAULT', author: { memberType: 'USER' } },
      { content: 'This is message 4', status: 'DEFAULT', author: { memberType: 'USER' } },
      { content: 'This is message 5', status: 'DEFAULT', author: { memberType: 'CONSENTEE_RECIPIENT' } },
      { content: 'This is message 6', status: 'DEFAULT', author: { memberType: 'CONSENTEE_RECIPIENT' } },
      { content: 'This is message 7', status: 'DEFAULT', author: { memberType: 'USER' } },
      { content: 'This is message 8', status: 'DEFAULT', author: { memberType: 'USER' } },
      { content: 'This is message 9', status: 'DEFAULT', author: { memberType: 'USER' } },
      { content: 'This is message 10', status: 'DEFAULT', author: { memberType: 'CONSENTEE_RECIPIENT' } },
      { content: 'This is message 11', status: 'DEFAULT', author: { memberType: 'USER' } },
      { content: 'This is message 12', status: 'PENDING', author: { memberType: 'USER' } },
      { content: 'This is message 13', status: 'PENDING', author: { memberType: 'USER' } },
      { content: 'This is message 14', status: 'PENDING', author: { memberType: 'USER' } },
    ],
  },
};

export const mockOnAddUserMessage = async (no) => {
  return {
    content: `This is message ${no + 1}`,
    status: 'PENDING',
    author: { memberType: Math.random() > 0.5 ? 'USER' : 'CONSENTEE_RECIPIENT' },
  };
};

export const mockOnAddConsenteeMessage = async (content) => {
  return {
    content,
    status: 'PENDING',
    author: { memberType: 'CONSENTEE_RECIPIENT' },
  };
};

export const mockOniViewConversation = async () => {};
