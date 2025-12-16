export interface IUserTokenInfo {
    email: string;
    firstName: string;
    lastName: string;
    image: string;
    roles: string[] | string | undefined;
    exp: number;
}