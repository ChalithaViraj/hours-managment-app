declare namespace Express {
    export interface Request {
        user?: User;
    }

    interface User {
        _id: string;
        name: string;
        password: string;
        email: string;
        number: string;
        role: string;
        active: boolean;

    }
}
