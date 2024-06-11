
export type IUser = {
    _id: string,
    fullname: string,
    email: string,
    password: string;
};
export type SigninType = {
    email: string,
    password: string;
};

export type State = {
    _id: string,
    fullname: string,
    email: string,
    jwt: string;
};

export const initial_State = {
    _id: '',
    fullname: 'Guest',
    email: '',
    jwt: ''
};