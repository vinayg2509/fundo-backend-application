import { newUserValidator } from "../validators/user.validator"
import * as userController from "../controllers/user.controller"
import express from 'express'

const router=express.Router()


router.post('',newUserValidator, userController.newUser)

export default router