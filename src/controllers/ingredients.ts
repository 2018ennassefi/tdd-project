import {Router} from 'express'
import { Request, Response } from 'express';

const recipeRouter = Router()

recipeRouter.post('/', (req: Request, res: Response) => {
    res.sendStatus(200)
})



export default recipeRouter;