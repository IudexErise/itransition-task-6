export default (state, action) => {
  switch (action.type) {
    case 'JOINED':
      return {
        ...state,
        joined: true,
        senderName: action.payload.senderName,
        recipientName: action.payload.recipientName
      };

      case 'SET_DATA':
      return {
        ...state,
        users: action.payload.users,
        messages: action.payload.messages,
      };

    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      };

    case 'NEW_MESSAGES':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    default:
      return state;
  }
}