export interface IUserRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    image?: File | null;
}