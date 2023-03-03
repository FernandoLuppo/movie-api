//  Dependencies
import nodemailer from "nodemailer"

export const recover = (email: string, numbers: number[]) => {

    const EMAIL_USER = process.env.EMAIL_USER
    const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        secure: true,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const details = {
        from: EMAIL_USER,
        to: email,
        subject: "LuppoTW Movie - Recuperar senha!",
        html: 
        `
            <h3 style="color: #000;">Precisa restaurar sua senha?</h3>
            <p style="color: #000;">
                Segue abaixo seu <strong>código de verificação</strong> Agora retorne ao nosso 
                site e preencha o campo requirido para conseguir mudar sua senha.
            </p>
            <p><strong>${numbers[0]}${numbers[1]}${numbers[2]}${numbers[3]}${numbers[4]}${numbers[5]}</strong></p>
            <br />
            <p style="color: #000;">Caso você não tenha solicitado uma troca de senha, por favor desconsidere esse email</p>
        `
    }

    transporter.sendMail(details, error => {
        if (error) console.log(error)
        else return
    })
}