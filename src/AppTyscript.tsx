import{Dispatch, SetStateAction} from 'react'
interface freeObject {
    [key:string]:string
}
  
interface snackInterface{
    isOpen:boolean,
    message:string
}

interface contextInterface{
    snack:snackInterface,
    setSnack:Dispatch<SetStateAction<snackInterface>>,
    isLogin:boolean,
    setLogin:Dispatch<SetStateAction<boolean>>
}

interface apiResponseInterface{
    status:boolean,
    token:string
    data:{
      status:false,
      name:string,
      role:string,
      password:string,
      columnName:string[],
      columnType:string[],
      message:string[],
      [key:string]:unknown
    }
}
export type {
    freeObject,
    snackInterface,
    contextInterface,
    apiResponseInterface,
}