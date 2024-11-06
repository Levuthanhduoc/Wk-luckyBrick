import { apiResponseInterface } from "../../AppTyscript";

const apiUrl = import.meta.env.VITE_API_URL

export default async function logout(){
    let result = {status:true,message:"LogOut success."}
    try{
      let fetchResponse = await fetch( apiUrl + "users/logout",{
          method: 'POST',
          credentials: 'include',
      })
      if(fetchResponse.ok){
        const response = await fetchResponse.json() as apiResponseInterface;
        if(!response.status){
            result = {status:false,message:"Server error, please try again."};
        }
      }
    }catch(err){
        result = {status:false,message:"Oop something happen please try again"};
    }
    return result
}