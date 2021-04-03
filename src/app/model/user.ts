import { Role } from "./role";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role: Role;
    token?: string;
}
