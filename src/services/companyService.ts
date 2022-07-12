import { unauthorizedError } from "../middlewares/handlerErrorMiddleware.js";
import { findByIdAndCompanyId } from "../repositories/employeeRepository.js";
import { insert, TransactionTypes } from "./../repositories/cardRepository.js";
import cardService from "./../services/cardService.js";

async function newCard(employeeId: number, cardType: TransactionTypes) {
    cardService.existingCard(employeeId, cardType);

    const cardData = await cardService.newCardData(employeeId, cardType);

    await insert(cardData);
}

async function isMyEmployee(employeeId: number, id: number) {
    const employeeData = await findByIdAndCompanyId(employeeId, id); 
    if (!employeeData) throw unauthorizedError();
}

const companyService = {
    newCard,
    isMyEmployee
}

export default companyService;