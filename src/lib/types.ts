import type { Record } from "pocketbase";


export interface Message extends Record {
    message: string;
    user: string;
    expand: {
        user?: User;
    };
}

export interface User extends Record {
    username: string;
    verified: boolean;
    emailVisibility: boolean;
    email: string;
    name: string;
    avatar: string;
}
