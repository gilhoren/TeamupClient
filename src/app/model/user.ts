import { Role } from "./role";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role: Role;
    admin: boolean;
    token?: string;
}
