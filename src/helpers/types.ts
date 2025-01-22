export interface IUser {
    id: number;
    name: string;
    surname: string;
    login: string;
    password: string;
    cover: string;
    picture: string;
    followers: IUser[];
    following: IUser[];
    isPrivate:boolean;
    user:IUser
  }
  export interface IPost {
    id: number;
    picture: string;
    title: string;
    refetch: () => void;
    isLiked:boolean;
    likesCount:number
  }
  export interface IResponse {
    status: string;
    message: string;
    payload: unknown;
    user?: IUser;
  }
  export type IAuth = Pick<IUser, "login" | "password">;
  
  export interface IAccount extends IUser {
    posts: IPost[];
    connection: {
      followsMe: boolean;
      following: boolean;
      requested: boolean;
    };
  }
  
  export interface IContext {
    user: null | IUser;
    refetch: () => void;
  }
  export type ILogin = Pick<IUser, "login" | "password">;
  export interface IPassword {
    old: string;
    newpwd: string;
  }
  export interface IAddPost {
    photo: File | string;
    content: string;
  }
  
  export interface IAccountContext {
    account: IAccount;
    refetch: () => void;
  }