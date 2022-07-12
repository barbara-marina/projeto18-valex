import { Request, Response } from "express";
import companyService from "../services/companyService.js";
import { TransactionTypes } from "./../repositories/cardRepository.js";

async function createNewCard(req: Request, res: Response) {
    const { employeeId, cardType } : { employeeId : number, cardType: TransactionTypes } = req.body;
    const { id } : { id: number} = res.locals.company;
    await companyService.isMyEmployee(employeeId, id);
    await companyService.newCard(employeeId, cardType);

    res.status(200).send("Card created successfully.");
}

const companyController = {
    createNewCard
};

export default companyController;