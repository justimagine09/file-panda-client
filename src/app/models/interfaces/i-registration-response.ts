import { IUser } from './i-user';

export interface IRegistrationResponse {
    message: string;
    user: IUser;
}