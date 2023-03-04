//  Dependencies
import bcryptjs from "bcryptjs"
import mongoose from "mongoose"
//  Types
import { Request, Response } from "express"
import { IRegister, ILogin, IBanc, ILocalStorage } from "../../types"
//  Bank
import "../../models/User"
const User = mongoose.model("Users")

export const userController = {
    register: (req: Request, res: Response) => {
        let encrypted = bcryptjs.genSaltSync(10)
        const { name, email, password }:IRegister = req.body

        User.findOne({ email: email })
        .then(user => {
            console.log("Usuário ", user);
            if (user) res.status(400).send(["Usuário já registrado"])
            else {
                const newUser = {
                    name,
                    email,
                    password: bcryptjs.hashSync(password, encrypted)
                }
                new User(newUser)
                .save()
                .then(() => res.status(201).send("Usuário criado com sucesso!"))
                .catch(() => res.status(400).send(["Erro ao tentar registrar um novo usuário"]))
            }
        })
    },

    login: (req: Request, res: Response) => {
        const {password, email}:ILogin = req.body

        const userTeste = {
            name: "Teste",
            _id: "123456789"
        }

        if (email === "testefl@teste.com" && password === "12345") {
            res.status(200).send(userTeste)
        } else {
            User.findOne({ email: email })
            .then(user => {
                console.log("User do Login ", user)
                bcryptjs.compare(password, user.password, (error, key) => {
                    if (key === true) {
                        const { name, _id }:IBanc = user
                        const userInfos = { name, _id }
                        res.status(200).send(userInfos)
                    } 
                    else res.status(400).send(["Email ou senha incorreto"])
                })
            })
            .catch(() => res.status(400).send(["Email ou senha incorreto"]))
        }
    },

    localStorage: async (req: Request, res: Response) => {          
        const _id: ILocalStorage = req.body.storageData
        const userTeste = {
            _id: "123456789",
            name: "Teste",
            email: "testeFL@teste.com"
        }

        if ( req.body.storageData === "123456789") {
            res.status(200).send(userTeste)
        } else {
            await User.findOne({_id: _id})
            .then(data => {             
                const userData = {
                    _id: data._id,
                    name: data.name,
                    email: data.email
                }
                res.status(200).send(userData)
            })
            .catch((error: string) => res.status(400).send(error))
        }
    },
}