import crypto from 'crypto-js'


export function Utf8toBase64(text){
    if(!text){
        return ""
    }
    const wordArray=crypto.enc.Utf8.parse(text)
    return crypto.enc.Base64.stringify(wordArray)
}

export function Base64toUtf8(text){
    if(!text){
        return ""
    }
    const wordArray=crypto.enc.Base64.parse(text)
    return crypto.enc.Utf8.stringify(wordArray)
}