export default function isSale(time:string){
    if(time){
        const endTime = new Date(time).getTime()
        const currentTime = new Date().getTime()
        const timeDiff = endTime - currentTime
        if(timeDiff > 0){
            return true
        } 
    }
    return false
}