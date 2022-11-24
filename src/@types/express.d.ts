declare namespace Express {
    export interface Request {
        userAuth: string;
        sellerAuth: string;
        file: Array;
    }
}
