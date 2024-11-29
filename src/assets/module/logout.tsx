import { apiResponseInterface } from "../../AppTyscript";
import cookieToObject from "./cookie2Object";

interface logoutType {
    onSuccess:(something?:unknown)=>void,
    onFail:(something?:unknown)=>void
}
const apiUrl = import.meta.env.VITE_API_URL

const logout = async (args:logoutType)=>{
    try{
      const result = await fetch( apiUrl + "users/logout",{
          method: 'POST',
          credentials: 'include',
      })
      if(result.ok){
        const response = await result.json() as apiResponseInterface;
        if(response.status){
          const cookieJson = cookieToObject()
          if(cookieJson){
            const expires = new Date(Date.now()-1000)
            for(const i in cookieJson){
              document.cookie = `${i}="";expires=${expires};`
            }
          }
            args.onSuccess(response.data.message[0])
        }else{
          throw new Error("server err");
        }
      }
    }catch(err){
      console.log(err)
        args.onFail()
    }
  }

export default logout