import { Router } from "express";
import { createNewBenefit, getAllBenefits } from "./benefits.controller";

import user from "../../middlewares/user.middleware";

const benefitsRouter = Router();

benefitsRouter.post('/new', user, createNewBenefit)
benefitsRouter.get('/all', user, getAllBenefits)

export default benefitsRouter