export interface UserPassword {
    user: string;
    password: string;
}
export interface LoginResponse {
    logged: boolean;
    foundUser: boolean;
    correctPassword: boolean;
    user: string;
    name: string;
    lastName: string;
}