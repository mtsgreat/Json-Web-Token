import { createHmac } from 'node:crypto'
import { generateSignature } from './generateSignature'

interface ISignOptions {
    data: Record<string, any>,
    exp: number,
    secret: string
}

export function sign(options: ISignOptions) {

    //Header
    const header = {
        alg: 'HS256',
        typ: 'JWT'
    }

    //Payload
    const payload = {
        ...options.data,
        iat: Date.now(),
        exp: options.exp
    }


    const base64EncodedHeader = Buffer
    .from(JSON.stringify(header))
    .toString('base64url')


    const base64EncodedPayload = Buffer
    .from(JSON.stringify(payload))
    .toString('base64url')


    //Secret
    const signature =
        generateSignature({header: base64EncodedHeader, payload: base64EncodedPayload, secret: options.secret })

    //JWT - Json Web Token
    return `${base64EncodedHeader}.${base64EncodedPayload}.${signature}`


}
