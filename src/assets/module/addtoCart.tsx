import { contextInterface } from "../../AppTyscript"

interface shopItem {
    id:string,
    name:string,
    quantity?:string,
    price:string,
    sale:string,
    timesale:string,
    picture:string,
}

const AddToCart =(shopItem:shopItem,context:contextInterface)=>{
    const {cart,setCart} = context
    if(cart){
        let quantity = 1
        const oldCart =[...cart]
        let newCart = []
        let isMacth = false
        let index = 0
        for(const i of oldCart){
            if(i.id == shopItem.id){
                quantity = Number(i.quantity) + 1 + Number(shopItem.quantity||"0")
                oldCart[index].quantity = `${quantity}`
                isMacth = true
            }
            index = index +1
        }
        if(isMacth){
            newCart = oldCart
        }else{
            newCart = [...cart,{
                "id":shopItem.id,
                "name":shopItem.name,
                "quantity":`${quantity}`,
                "price":`${shopItem.price}`,
                "sale":`${shopItem.sale||0}`,
                "timesale":`${shopItem.timesale}`,
                "picture":shopItem.picture,
            }]
        }
        localStorage.setItem("shopCart",JSON.stringify(newCart))
        setCart(newCart)
    }
}

export default AddToCart