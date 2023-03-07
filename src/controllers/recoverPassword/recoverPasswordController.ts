//  Dependencies
import bcryptjs from "bcryptjs"
import mongoose from "mongoose"
//  Types
import { Request, Response } from "express"
//  Bank
import "../../models/User"
import { recover } from "../../helpers"
const User = mongoose.model("Users")

export const recoverPasswordController = {
    recoverPassword: async (req: Request, res: Response) => {
        const { email } = req.body
        
        let code: number[] = []
        for(let i = 0; i < 6; i++) {
            const number = Math.floor(Math.random() * 9)
            code.push(number)
        }
     
        User.findOne({ email: email })
        .then(data => {
            if (data !== null) {
                const userCode = {
                    _id: data._id,
                    code
                }
                recover(email, code)
                res.status(200).send(userCode)
            } else res.status(400).send(["Este email não existe"])
        })
        .catch(error => res.status(400).send("Failed to try to verify email in password recovery: " + error))
    },

    checkID: async (req: Request, res: Response) => {
        const { _id } = req.body

        await User.findOne({_id: _id})
        .then(data => {
            if (data !== null) res.status(200).send({message: "success"})
            else res.status(400).send({message: "failure"})
        })
        .catch(error => res.status(400).send("Este usuário não existe - " + error))
    },

    newPassword: async (req: Request, res: Response) => {
        let { password, _id } = req.body
        let encrypted = bcryptjs.genSaltSync(10)
        password = bcryptjs.hashSync(password, encrypted)

        await User.updateOne({_id: _id}, { password })
        .then(() => res.status(200).send({message: "success"}))
        .catch(error => res.status(400).send(error))
    }
}