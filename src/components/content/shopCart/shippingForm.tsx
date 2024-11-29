import { CreditScore, TravelExplore } from "@mui/icons-material"
import { Box, Button, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import { FormEvent } from "react"
import {v4 as uuid4} from 'uuid'

export default function ShippingForm (props:{onSubmit:(e:FormEvent<HTMLFormElement>)=>void}){
    const infoField =[
        [
            {name:"firstName",lable:"First name",require:true,type:"text"},
            {name:"lastName",lable:"Last name",require:true,type:"text"},
        ],
        [
            {name:"phoneNumber",lable:"Phone number",require:true,type:"text"},
            {name:"Email",lable:"email",require:false,type:"email"}
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
                        <Typography fontSize={"1.5em"}>Shipping info</Typography>
                        <Stack gap={"20px"}>
                            {infoField.map((rowItem)=>
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
                        <Typography fontSize={"1.5em"}>Address Finder</Typography>
                        <TextField
                            id="address"
                            size="small"
                            required
                            fullWidth
                            slotProps={{
                            input: {
                                startAdornment: (
                                <InputAdornment position="start">
                                    <TravelExplore/>
                                </InputAdornment>
                                ),
                            },
                            }}
                            variant="outlined"
                        />
                    </Box>
                    <Stack justifyContent={"center"} alignItems={"center"}>
                        <Button type="submit" sx={{width:{xs:"100%",sm:"80%"}}} color="error" variant="outlined">
                            <CreditScore/> Payment
                        </Button> 
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}