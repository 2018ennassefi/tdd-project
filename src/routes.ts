import { Router } from "express";
import { recipeRouter } from "./controllers/ingredients";
const baseRouter = Router();
baseRouter.use('/recipe',recipeRouter)
export default baseRouter;