//  Dependencies
import express from "express";
//  Controllers
import { userController, recoverPasswordController } from "../controllers";
import { tmdb } from "../helpers";
/// Middleware
import { userMiddleware, passwordMiddleware } from "../middleware";

const router = express.Router()

//  User Routes
router.post("/register", userMiddleware.register, userController.register)
router.post("/login", userMiddleware.login, userController.login)
router.post("/localStorage", userController.localStorage)

//  Recover Password Routes
router.post("/recover-password", passwordMiddleware.recoverPassword, recoverPasswordController.recoverPassword)
router.post("/new-password-check-id", recoverPasswordController.checkID)
router.put("/new-password", passwordMiddleware.newPassword, recoverPasswordController.newPassword)

//  Movies Routes
router.get("/movies", tmdb.getMovies)

//  Teste
import { Request, Response } from "express"
router.get("/user", (req: Request, res: Response) => {
    const user = {
        name: "Fernando",
        age: 20
    }
    res.status(200).send(user)
})

export default router
