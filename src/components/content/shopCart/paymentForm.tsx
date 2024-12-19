import { PriceCheck} from "@mui/icons-material"
import { Box, Button, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import { FormEvent, useState } from "react"
import {v4 as uuid4} from 'uuid'

export default function PaymentForm (props:{onSubmit:(e:FormEvent<HTMLFormElement>)=>void}){
    const [payMethod,setPaymethod] = useState("visa")

    const infoField =[
        [
            {name:"CardNumber",lable:"Card Number",require:true,type:"text"},
        ],
        [
            {name:"expiryDate",lable:"Expiry Date",require:true,type:"text"},
            {name:"cvv",lable:"CVV",require:true,type:"text"}
        ]
    ]
    const billingField =[
        [
            {name:"firstName",lable:"First name",require:true,type:"text"},
            {name:"lastName",lable:"Last name",require:true,type:"text"},
        ],
        [
            {name:"phoneNumber",lable:"Phone number",require:true,type:"text"},
            {name:"Email",lable:"email",require:false,type:"email"}
        ],
        [
            {name:"address",lable:"Address",require:true,type:"text"},
            {name:"zipcode",lable:"Zipcode",require:false,type:"text"}
        ]
    ]
    return(
        <Box>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={props.onSubmit}
                >
                <Stack gap={"10px"}>
                    <Box>
                        <Stack gap={"20px"}>
                            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                <Typography fontSize={"1.5em"}>Payment Method</Typography>
                                <Select
                                    size="small"
                                    id={"paymentMethod"}
                                    name={"paymentMethod"}
                                    defaultValue={payMethod}
                                    onChange={(e)=>setPaymethod(e.target.value)}
                                >
                                    <MenuItem value={"visa"}>Visa/MasterCard</MenuItem>
                                    <MenuItem value={"paypal"}>PayPal</MenuItem>
                                    <MenuItem value={"localBank"}>LocalBank</MenuItem>
                                </Select>
                            </Stack>
                            {payMethod=="visa"&&infoField.map((rowItem)=>
                                <Stack key={uuid4()} direction={{sm:"row"}} gap={"10px"}>
                                    {rowItem.map((columnItem)=>
                                        <TextField
                                            key={uuid4()}
                                            fullWidth
                                            type={columnItem.type}
                                            name={columnItem.name}
                                            size="small"
                                            required={columnItem.require}
                                            id={columnItem.name}
                                            label={columnItem.lable}
                                        />
                                    )}
                                </Stack>
                            )}
                        </Stack>
                    </Box>
                    <Box>
                        <Stack gap={"20px"}>
                            <Typography fontSize={"1.5em"}>Billing Address</Typography>
                            {billingField.map((rowItem)=>
                                    <Stack key={uuid4()} direction={{sm:"row"}} gap={"10px"}>
                                        {rowItem.map((columnItem)=>
                                            <TextField
                                                key={uuid4()}
                                                fullWidth
                                                type={columnItem.type}
                                                name={columnItem.name}
                                                size="small"
                                                required={columnItem.require}
                                                id={columnItem.name}
                                                label={columnItem.lable}
                                            />
                                        )}
                                    </Stack>
                            )}
                        </Stack>
                    </Box>
                    <Stack justifyContent={"center"} alignItems={"center"}>
                        {payMethod=="paypal"? <Button type="submit" sx={{width:{xs:"100%",sm:"80%"}}} color="error" variant="outlined">
                            Order and Pay with PayPal
                        </Button>:<Button type="submit" sx={{width:{xs:"100%",sm:"80%"}}} color="error" variant="outlined">
                            <PriceCheck/> Order and Pay
                        </Button>
                       
                        } 
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}