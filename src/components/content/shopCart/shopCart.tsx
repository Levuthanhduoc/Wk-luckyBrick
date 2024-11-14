import { Box, Button, IconButton, SxProps, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../base/ContextWarper";
import { cartType, contextInterface } from "../../../AppTyscript";
import { Add, LocalMallSharp, Remove,RemoveShoppingCartOutlined } from "@mui/icons-material";

interface propsType{
    sx?:SxProps
}

export default function ShopCart (props:propsType){
    const {cart, setCart} = useContext(Context) as contextInterface
    const centerCss = {
        maxWidth:"1540px",width:"100%",margin:"auto",
        padding:{xs:"60px 15px 70px 15px",sm:"60px 15px 70px 15px",md:"50px 30px 70px 30px",lg:"45px 50px 70px 50px"}, 
    }
    const totalMoney = (item:cartType)=>{
        if(item){
            const quantity = Number(item.quantity)
            const price = Number(item.price)
            const sale = parseFloat(item.sale)
            return (quantity * (price - (price * sale)))
        }
        return 0
    }

    const modifyShoppingCart = (id:string,option:"add"|"remove"|"delete")=>{
        const newCart = []
        for(const item of cart){
            let newItem = {...item}
            if(item.id == id){
                switch (option) {
                    case "add":
                        if(Number(item.quantity) < 99){
                            newItem = {...item,quantity:`${Number(item.quantity) + 1}`}
                        }
                        break;
                    case "remove":
                        if(Number(item.quantity) > 0){
                            newItem = {...item,quantity:`${Number(item.quantity) - 1}`}
                        }
                        break;
                    case "delete":
                        continue;
                        break;
                    default:
                        break;
                }
            }
            newCart.push(newItem)
        }
        setCart(newCart)
    }   
    return(
        <Box sx={{
            ...centerCss,...props.sx, 
            display:"flex",flexDirection:"column",gap:"30px"}}
            overflow={"auto"}
            >
            <Typography textAlign={"center"}>MY CART</Typography>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Sale</TableCell>
                    <TableCell align="center">Total</TableCell>
                    <TableCell align="center"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {cart&&cart.map((item)=>
                    <TableRow
                        key={item.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="center">{item.name}</TableCell>
                        <TableCell align="center">{item.price}</TableCell>
                        <TableCell align="center">{item.quantity}</TableCell>
                        <TableCell align="center">{Number(item.sale)*100 }%</TableCell>
                        <TableCell align="center">{totalMoney(item)}</TableCell>
                        <TableCell align="center">
                            <IconButton onClick={()=>modifyShoppingCart(item.id,"add")}><Add/></IconButton>
                            <IconButton onClick={()=>modifyShoppingCart(item.id,"remove")}><Remove/></IconButton>
                            <IconButton onClick={()=>modifyShoppingCart(item.id,"delete")}><RemoveShoppingCartOutlined/></IconButton>
                        </TableCell>
                    </TableRow>
                    )}
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="center">Total item: {cart?.length}</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">{cart.reduce((total,current)=>total + totalMoney(current),0)}</TableCell>
                        <TableCell align="center"><Button>Checkout<LocalMallSharp/></Button></TableCell>
                    </TableRow>
                </TableBody>
            </Table>       
        </Box>
    )
}