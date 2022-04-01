import express from 'express'
import { Request, Response } from 'express';

export const recipeRouter = express.Router()

recipeRouter.post('/', (req: Request, res: Response) => {
    res.sendStatus(200)
})

recipeRouter.get('/', (req: Request, res: Response) => {
    res.sendStatus(200)
})