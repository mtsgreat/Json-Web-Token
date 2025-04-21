import { generateSignature } from "./generateSignature";

interface IVerify  {
    token: string;
    secret: string;
}

export function verify({token, secret}: IVerify){
    const [headerSent, payloadSent, signatureSent] = token.split('.')

   // console.log({headerSent, payloadSent, signatureSent})

    const signature = generateSignature({
        header: headerSent,
        payload: payloadSent,
        secret
    })

    if(signature !== signatureSent) {
        throw new Error('Invalid JWT Token')
    }

    const decodedPayload = JSON.parse(
        Buffer
        .from(payloadSent, 'base64url')
        .toString('utf-8')
    )


    if(decodedPayload.exp < Date.now()) {
       throw new Error('Expired Token')
    }

    return decodedPayload
}
