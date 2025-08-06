import express from 'express'
import * as noteController from "../controllers/notes.controller"
import { userAuth } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/',userAuth, noteController.createNote)


export default router