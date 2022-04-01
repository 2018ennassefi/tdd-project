import {Router} from 'express'
import { Request, Response } from 'express';

const recipeRouter = Router()

recipeRouter.post('/', (req: Request, res: Response) => {
    console.log('req',req)
    res.sendStatus(200)
})



export default recipeRouter;