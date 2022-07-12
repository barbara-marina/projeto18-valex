import { Request, Response, NextFunction } from "express";
import { unauthorizedError } from "./handlerErrorMiddleware.js";
import { findByApiKey } from "./../repositories/companyRepository.js";

export default async function apiKeyValidation(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'] as string;
    
    if (!apiKey) throw unauthorizedError();

    const company = await findByApiKey(apiKey);

    if (!company) throw unauthorizedError();

    res.locals.company = company;
    
    next();
} 