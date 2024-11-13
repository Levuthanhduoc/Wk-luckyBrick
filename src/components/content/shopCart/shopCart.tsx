import { Box, SxProps, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../base/ContextWarper";
import { cartType, contextInterface } from "../../../AppTyscript";

interface propsType{
    sx?:SxProps
}

export default function ShopCart (props:propsType){
    const {cart} = useContext(Context) as contextInterface
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
    return(
        <Box sx={{
            ...centerCss,...props.sx, 
            display:"flex",flexDirection:"column",gap:"30px"}}
            overflow={"auto"}
            >
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Sale</TableCell>
                    <TableCell align="center">Total</TableCell>
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
                    </TableRow>
                </TableBody>
            </Table>       
        </Box>
    )
}