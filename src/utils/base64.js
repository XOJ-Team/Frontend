import crypto from 'crypto-js'


export function Utf8toBase64(text){
    const wordArray=crypto.enc.Utf8.parse(text)
    return crypto.enc.Base64.stringify(wordArray)
}