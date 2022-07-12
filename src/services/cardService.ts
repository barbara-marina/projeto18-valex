import { faker } from '@faker-js/faker';
import { findByNumber, findByTypeAndEmployeeId, TransactionTypes } from "../repositories/cardRepository.js";
import { conflictError, unauthorizedError } from "../middlewares/handlerErrorMiddleware.js";
import { Employee, findById } from "../repositories/employeeRepository.js";
import employeeService from './employeeService.js';
import dayjs from 'dayjs';
import Cryptr from 'cryptr';

async function newCardData(employeeId: number, cardType: TransactionTypes) {
    const data: Employee = await findById(employeeId);
    if (!data) throw unauthorizedError();

    const cardData : {
        employeeId: number,
        number: string,
        cardholderName: string,
        securityCode: string,
        expirationDate: string,
        isVirtual: boolean,
        isBlocked: boolean,
        type: TransactionTypes
    } = 
    {
        employeeId: data.id,
        number: await cardNumber(),
        cardholderName: employeeService.formatName(data.fullName),
        securityCode: await hashCVC(),
        expirationDate: dayjs().add(5, "year").format("MM/YY"),
        isVirtual: false,
        isBlocked: false,
        type: cardType
    };

    return cardData;
}

async function existingCard(employeeId: number, cardType: TransactionTypes) {
    const card = await findByTypeAndEmployeeId(cardType, employeeId);
    if (card) {
        throw conflictError();
    }
}

async function cardNumber(){
    let number: string;
    while (true) {
        number = faker.finance.creditCardNumber('#### #### #### ####');
        const result = await findByNumber(number);
        if (!result) return number;
    }
}

function hashCVC(){
    const cryptr = new Cryptr('secret');

    return cryptr.encrypt(faker.finance.creditCardCVV());
}

const cardService = {
    existingCard, 
    newCardData
};

export default cardService;