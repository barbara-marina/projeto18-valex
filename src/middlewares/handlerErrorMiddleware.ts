import { Request, Response, NextFunction } from "express";

const serviceErrorToStatusCode = {
    unauthorized: 401,
    conflict: 409
};

const serviceErrorToMessage = {
    unauthorized: "Unauthorized.",
    conflict: "Card already exists."
};

export default function handlerErrorMiddleware(error: {type: string}, _req: Request, res: Response, next: NextFunction) {
    if (error.type) res.status(serviceErrorToStatusCode[error.type]).send(serviceErrorToMessage[error.type]);

    res.sendStatus(500);
}

export function unauthorizedError() {
    return {type: "unauthorized"};
}

export function conflictError() {
    return {type: "conflict"};
}