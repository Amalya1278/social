export interface IUser {
    id: number
    name: string
    surname: string
    login: string
    password: string
    cover:string
    picture:string
    followers:IUser[]
    following:IUser[]
}

export interface IResponse {
    status: string
    message: string
    payload: unknown
    user?: IUser
}
export type IAuth = Pick<IUser, 'login' | 'password'>

export interface IContext {
    user: null | IUser
    refetch:()=>void
}
export interface IPassword{
    old:string
    newpwd:string


}
export interface ILogin{
 
    password:string
    login:string
    
}
export interface IPost{
    photo:File
    content:string
}
export interface IGallery{
    posts:IPost[]
}