interface FileProps {
    fieldname: string,
	originalname: string,
	encoding: string,
	mimetype: string,
	destination: string,
	filename: string,
	path: string,
	size: number
}

declare namespace Express {
    export interface Request {
        userAuth: string;
        sellerAuth: string;
        file: Array[FileProps];
        files: Array[FileProps];
    }
}
