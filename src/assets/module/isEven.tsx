function isEven(num:number|string):number{
    let newNum = Number(num)
    let result = 0
    if(newNum%2 == 0){
        result = 1
    }
    return result
}

export default isEven