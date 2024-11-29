import { apiResponseInterface } from "../../AppTyscript"

interface Option{
    cookies?:boolean,
    JsonData?:string
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
        if(props.option.JsonData){
            addon = {...addon,
                body: props.option.JsonData,
                headers: { 'Content-Type': 'application/json' },
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