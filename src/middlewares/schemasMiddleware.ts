import { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";

export default function schemasValidations(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const validation = schema.validate(req.body, {abortEarly: false});
        const {error} = validation;

        if (error) return res.status(422).send(error.details.map(detail => detail.message));

        next();
    }
}