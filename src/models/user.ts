export interface User {
    username: string;
    role:string
}
export type UserModel = {
    id:string;
    username:string;
    email:string;
    firstName: string,
    lastName: string,
    age:number;
    role:string;
}
export type UserUpdateModel = {
    age:number;
    firstName: string,
    lastName: string,
}