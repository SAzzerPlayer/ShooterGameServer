type ServerSendToSingleUser = () => void;
type ServerSendToAllUsers = () => void;
type ServerSendToGroupUsers = () => void;
type ServerSendToAllWithoutGroupUsers = () => void;

export type WSServerSender =
  | ServerSendToSingleUser
  | ServerSendToAllUsers
  | ServerSendToGroupUsers
  | ServerSendToAllWithoutGroupUsers;
