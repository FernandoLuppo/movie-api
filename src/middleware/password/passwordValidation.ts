//  Dependencies
import * as yup from "yup"
//  Types
import { Request, Response, NextFunction } from "express"

export const passwordMiddleware = {
    recoverPassword: async (req: Request, res: Response, next: NextFunction) => {
        const recoverValidationSchema = yup.object().shape({
            email: yup.string().required("Campo Email é Obrigatório").email("Campo Email deve conter um email valido"),
        }) 

        await recoverValidationSchema.validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch((err: yup.ValidationError) => {
            const errors: string[] = []
            err.inner.forEach(error => {
                if(!error.path) return   
                errors.push(error.message)
            })              
            res.status(400).send(errors)    
        }); 
    },

    newPassword: async (req: Request, res: Response, next: NextFunction) => {
        const newPasswordValidationSchema = yup.object().shape({
            password: yup.string().required("Campo Senha é obrigatório").min(3, "Campo Senha precisa ter no mínimo 3 caracteres")
        })

        await newPasswordValidationSchema.validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch((err: yup.ValidationError) => {
            const errors: string[] = []
            err.inner.forEach(error => {
                if(!error.path) return
                errors.push(error.message)
            })
            res.status(400).send(errors)
        })
    }

}