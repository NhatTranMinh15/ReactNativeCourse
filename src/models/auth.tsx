export type LogInModel = {
    username: string,
    password: string,
}

export type LogInResponseModel = {
    username: string,
    location: string,
    roleId: number,
}

export type LoginResponseModel = {
    status: boolean,
    data: LoginResponseDataModel
}

export type LoginResponseDataModel = {
    user: LoginResponseUserModel,
    token: string
}

export type LoginResponseUserModel = {
    id:string;
    username:string;
    email:string;
    age:number;
    role:string;
    firstName: string,
    lastName: string,
}