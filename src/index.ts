import { sign } from "./jwt/sign"
import { verify } from "./jwt/verify"

console.log("Heelo TypeScrito")

const secret = 'senhasuperforte'

const token = sign({
    exp: Date.now() + (24 * 60 * 60 * 1000),
    data: {
        sub: '@mateus.silva',
    },
    secret
})




console.log(verify({token, secret}))
