import { apiResponseInterface } from "../../AppTyscript"

interface Option{
    cookies?:boolean,
}

interface FetchData{
    url:string,
    methoud:"get"|"put"|"post"
    option?:Option
}


async function fetchData(props:FetchData){
    let result:unknown
    let addon = {}
    if(props.option){
        if(props.option.cookies){
            addon = {...addon,
                credentials:"include"
            }
        }
    }
    const res = await fetch(props.url,{...addon,
        method:props.methoud,
    })
    if(res.ok){
        const itemdata = await res.json()
        result = itemdata.data as apiResponseInterface
    }else{
        result = false
    }
    return result
}

export default fetchData