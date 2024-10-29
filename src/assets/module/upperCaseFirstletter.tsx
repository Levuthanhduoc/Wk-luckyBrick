export default function upperCaseFirstLetter (text:string){
    const newText = text[0].toUpperCase() + text.slice(1,text.length)
    return newText
}