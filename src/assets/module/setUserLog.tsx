export default function setUserLog(logContent:{[key:string]:unknown}){
    if(!logContent){
        return
    }
    const key = "recentLegos"
    let newData = [logContent]
    const oldStringData = localStorage.getItem(key)
    if(oldStringData){
        let isExists = false
        const oldData = JSON.parse(oldStringData)
        for(let i of oldData.data){
            if(i["id"] == logContent.id){
                isExists = true
            }
        }
        newData = [...oldData.data]
        if(!isExists){
            newData.unshift(logContent)
        }
    }
    if(newData.length > 10){
        newData.pop()
    }
    const newStringData = JSON.stringify({data:newData})
    localStorage.setItem(key,newStringData)
}