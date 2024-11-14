export default function getShopCart(){
    const shopCart = localStorage.getItem("shopCart");
    if(shopCart){
        return JSON.parse(shopCart)
    }
    return null
}