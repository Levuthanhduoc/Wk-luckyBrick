interface freeObject{
    [key:string]:string
}
export default function cookieToObject(){
    const cookie = document.cookie
    const cut = cookie.split(";")
    const steparate = cut.reduce((total:freeObject,current)=>{
        const [key,value] = current.split("=")
        total[key] = value
        return total
    },{} as freeObject)
    return steparate
}