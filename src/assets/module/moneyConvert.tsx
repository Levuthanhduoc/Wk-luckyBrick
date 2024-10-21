export default function (value:number,contry:string):string|number{
    let result:number|string
    switch(contry){
        case "vn":
            result = value*25195
            break;
        default:
            result = value
    }
    return result
}