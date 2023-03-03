//  Dependencies
import * as yup from "yup"
//  Types
import { Request, Response, NextFunction } from "express"

export const userMiddleware = {
    register: async (req: Request, res: Response, next: NextFunction) => {
        
        const registerValidationSchema = yup.object().shape({
            name: yup.string().required("Campo Nome é Obrigatório").min(3, "O campo Nome precisa ter no mínimo 3 caracteres"),
            email: yup.string().required("Campo Email é Obrigatório").email("Campo Email deve conter um email valido"),
            password: yup.string().required("Campo Senha é Obrigatório").min(3, "O campo Senha precisa ter no mínimo 3 caracteres")
        })

        await registerValidationSchema.validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch((err: yup.ValidationError) => {
            const errors:string[] = []
            err.inner.forEach(error => {
                if(!error.path) return   
                errors.push(error.message)  
            })   
            res.status(400).send(errors)    
        });      
    },

    login: async (req: Request, res: Response, next: NextFunction) => {   

        const loginValidationSchema = yup.object().shape({
            email: yup.string().required("Campo Email é Obrigatório").email("Campo Email deve conter um email valido"),
            password: yup.string().required("Campo Senha é Obrigatório").min(3, "O campo Senha precisa ter no mínimo 3 caracteres")
        })        

        await loginValidationSchema.validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch((err: yup.ValidationError) => {
            const errors:string[] = []
            err.inner.forEach(error => {
                if(!error.path) return   
                errors.push(error.message)
            })              
            res.status(400).send(errors)    
        });  
    },
}