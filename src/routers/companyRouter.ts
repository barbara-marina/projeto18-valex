import { Router } from "express";
import companyController from "../controllers/companyController.js";
import apiKeyValidation from "../middlewares/apiKeyMiddleware.js";
import schemasValidations from "../middlewares/schemasMiddleware.js";
import newCardSchema from "../schemas/newCardSchema.js";

const companyRouter = Router();

companyRouter.post("/newCard", schemasValidations(newCardSchema), apiKeyValidation, companyController.createNewCard);

export default companyRouter;