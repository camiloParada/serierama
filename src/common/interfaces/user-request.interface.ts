export interface UserRequest extends Request {
  user: UserDataRequest;
}

export interface UserDataRequest {
  id: string;
  fullname: string;
}
