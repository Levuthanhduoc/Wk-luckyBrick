import { Box, Button,Divider, IconButton, Stack, Step, StepConnector, stepConnectorClasses, StepIconProps, StepLabel, Stepper, styled, SxProps, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Context } from "../../base/ContextWarper";
import { cartType, contextInterface } from "../../../AppTyscript";
import { Add, CheckCircle, CreditCard,DeleteOutline, DoneAll, LocalShipping, Person, Remove, ShoppingCartCheckout,} from "@mui/icons-material";
import {v4 as uuid4} from 'uuid'
import isSale from "../../../assets/module/isSale";
import CS from "../../../assets/css/component.module.css"
import ShippingForm from "./shippingForm";
import PaymentForm from "./paymentForm";

interface propsType{
    sx?:SxProps
}

// const apiUrl = import.meta.env.VITE_API_URL
const steps = [
    {label:"Cart",icon:<ShoppingCartCheckout/>},
    {label:"Info",icon:<Person/>},
    {label:"Payment",icon:<CreditCard/>},
    {label:"Done",icon:<DoneAll/>},
]

const StepIconConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient(136deg, rgb(0, 0, 0) 0%, rgb(0, 76, 153) 50%, rgb(0, 123, 255) 100%);',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient(136deg, rgb(0, 0, 0) 0%, rgb(0, 76, 153) 50%, rgb(0, 123, 255) 100%);',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
      ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[800],
      }),
    },
}));

const StepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme }) => ({
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[700],
    }),
    variants: [
      {
        props: ({ ownerState }) => ownerState.active,
        style: {
          backgroundImage:
            'linear-gradient(136deg, rgb(0, 123, 255) 0%, rgb(0, 76, 153) 50%, rgb(0, 0, 0) 100%)',
          boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        },
      },
      {
        props: ({ ownerState }) => ownerState.completed,
        style: {
          backgroundImage:
            'linear-gradient(136deg, rgb(0, 123, 255) 0%, rgb(0, 76, 153) 50%, rgb(0, 0, 0) 100%)',
        },
      },
    ],
}));

function StepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
    return (
      <StepIconRoot ownerState={{ completed, active }} className={className}>
        {steps[Number(props.icon) - 1]["icon"]}
      </StepIconRoot>
    );
}

export default function ShopCart (props:propsType){
    const {cart, setCart} = useContext(Context) as contextInterface
    const [payStep,setPayStep] = useState(0)
    const [additionalValue,setAdditionalValue] = useState<{shipping:string,tax:string}|null>(null)

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
    const onClickStep = (stepNumber:number)=>{
        if(stepNumber < payStep){
            if(payStep <= 2){
                setAdditionalValue(null)
            }
            setPayStep(stepNumber)
        }
    }

    const onSubmit = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        if(payStep < steps.length - 1){
            setPayStep(payStep + 1)
        }
        if(payStep == 1){
            setAdditionalValue({shipping:"0",tax:"0.2"})
        }
        console.log(formData)
    }

    const modifyShoppingCart = (id:string,option:"add"|"remove"|"delete"|"custom",value:number=0)=>{
        const newCart = []
        const customNumber = Number(value)
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
                        if(Number(item.quantity) > 1){
                            newItem = {...item,quantity:`${Number(item.quantity) - 1}`}
                        }
                        break;
                    case "custom":
                        if(!isNaN(customNumber)){
                            if( customNumber < 1){
                                newItem = {...item,quantity:`1`}
                            }else if( customNumber > 99){
                                newItem = {...item,quantity:`99`}
                            }else{
                                newItem = {...item,quantity:`${customNumber}`}
                            }
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
        localStorage.setItem("shopCart",JSON.stringify(newCart))
        setCart(newCart)
    }
    
    const cartItemPreview = (cartItem:{[key:string]:string})=>{
        const borderStyte = {borderStyle:"solid",borderColor:"rgba(255, 255, 255, 0.23)",borderRadius:"0"}
        const onChangeQuality = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
            const qualityValue = Number(e.target.value)
            const isValidNumber = !isNaN(qualityValue)
            if(isValidNumber){
                modifyShoppingCart(cartItem.id,"custom",qualityValue)
            }
        }
        return(
            <Stack key={cartItem.id} direction={"row"} alignItems={"center"} gap={{xs:"5px",sm:"50px"}}>
                <Box width={"100px"}>
                    <Box sx={{height:{xs:"50px",sm:"90px"},maxWidth:"140px",objectFit:"contain",}} component={"img"} src={cartItem.picture}/>
                </Box>
                <Stack minHeight={"70px"} direction={"column"} justifyContent={"space-between"} alignItems={"stretch"} height={"100%"} flex={1}>
                    <Typography sx={{wordBreak:"break-word"}}>{cartItem.name}</Typography>
                    <Box>
                        {<Typography sx={{color:"#B22222"}} >
                            ${Number(cartItem.price) - (Number(cartItem.price)*Number(cartItem.sale))}
                        </Typography>}
                        {isSale(cartItem.timesale)&&<Typography sx={{textDecoration:"line-through",color: "rgba(211, 211, 211, 0.55)"}}>${cartItem.price}</Typography>}
                    </Box>
                    {payStep!=0&&<Typography>Quantity: {cartItem.quantity}</Typography>}
                </Stack>
               {payStep==0&&<Stack direction={{xs:"column",sm:"row-reverse"}} alignItems={"center"} 
                    sx={{border:"1px solid rgba(255, 255, 255, 0.23)",borderRadius:"4px"}}
                >
                    <Button color="inherit" sx={{...borderStyte,borderWidth:{xs:"0 0 1px 0",sm:"0 0 0 1px"}}}
                        onClick={()=>modifyShoppingCart(cartItem.id,"add")}>
                            <Add/>
                    </Button>
                    <input className={CS.cleanInput} style={{width:"56px",textAlign:"center",padding:"6px 8px 6px 8px"}} value={cartItem.quantity} onChange={onChangeQuality}></input>
                    <Button color="inherit" sx={{...borderStyte,borderWidth:{xs:"1px 0 0 0",sm:"0 1px 0 0"}}}
                        onClick={()=>modifyShoppingCart(cartItem.id,"remove")}>
                            <Remove/>
                    </Button>
                </Stack>}
                {payStep==0&&<Box>
                    <IconButton onClick={()=>modifyShoppingCart(cartItem.id,"delete")}><DeleteOutline/></IconButton>
                </Box>}
            </Stack>
        )
    }
    
    return(
        <Box sx={{
            ...centerCss,...props.sx, 
            display:"flex",flexDirection:"column",gap:"30px"}}
            overflow={"auto"}
        >
            <Box sx={{backgroundColor:"rgb(0, 26, 51)"}} padding={"10px"} borderRadius={"5px"}>
                <Stepper activeStep={payStep} alternativeLabel connector={<StepIconConnector/>}>
                    {steps.map((StepDetail,index) => (
                        <Step key={index} onClick={()=>onClickStep(index)}>
                            <StepLabel sx={{cursor:"pointer"}} StepIconComponent={StepIcon}>{StepDetail.label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <Box sx={{backgroundColor:"rgb(0, 26, 51)"}} padding={"10px"} borderRadius={"5px"}>
                <Stack direction={{xs:"column",sm:"row"}} justifyContent={"space-between"} gap={"10px"}>
                    {payStep == 1&&<Box flex={{sm:1,md:2}}>
                        <ShippingForm onSubmit={onSubmit}/>
                    </Box>}
                    {payStep == 2&&<Box flex={{sm:1,md:2}}>
                        <PaymentForm onSubmit={onSubmit}/>
                    </Box>}
                    {payStep == 3&&<Box flex={{sm:1,md:2}} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                        <CheckCircle sx={{ fontSize: 50 }}/>
                        <Typography>All Done</Typography>
                        <Typography>Thank you for choosing us</Typography>
                    </Box>}
                    <Divider orientation="vertical"/>
                    <Divider orientation="horizontal"/>
                    <Box width={"100%"} flex={{sm:1}}>
                        <Typography fontSize={"1.5em"}>Order Summary</Typography>
                        <Divider/>
                        {cart&&cart.map((item)=>{
                            return(
                                    <Box key={uuid4()}>
                                        {cartItemPreview(item)}
                                        <Divider key={uuid4()} sx={{margin:"5px 0 5px 0"}}/>
                                    </Box>
                            )
                        })}   
                        <Stack gap={"5px"}>
                            <Stack direction={"row"} justifyContent={"space-between"}>
                                <Typography>Value of {cart.length} item:</Typography>
                                <Typography>${cart.reduce((total,current)=>total + totalMoney(current),0)}</Typography>
                            </Stack>
                            {additionalValue?.shipping&&<Stack direction={"row"} justifyContent={"space-between"}>
                                <Typography>Shiping fee:</Typography>
                                <Typography>{Number(additionalValue?.shipping||"0")}</Typography>
                            </Stack>}
                            {additionalValue?.tax&&<Stack direction={"row"} justifyContent={"space-between"}>
                                <Typography>Tax fee:</Typography>
                                <Typography>{Number(additionalValue?.tax||"0")}</Typography>
                            </Stack>}
                            <Stack direction={"row"} justifyContent={"space-between"}>
                                <Typography fontWeight={700}>Order Total:</Typography>
                                <Typography>
                                    ${(cart.reduce((total,current)=>total + totalMoney(current),0) 
                                    + Number(additionalValue?.shipping||"0") 
                                    + Number(additionalValue?.tax||"0")).toFixed(2)}
                                </Typography>
                            </Stack>
                            {payStep==0&&<Stack justifyContent={"center"} alignItems={"center"}>
                                <Button sx={{width:"80%"}} color="error" variant="outlined"
                                    onClick={()=>setPayStep(payStep + 1)}
                                >
                                    <LocalShipping/> Shipping
                                </Button> 
                            </Stack>}
                        </Stack>
                    </Box>  
                </Stack>
            </Box>
        </Box>
    )
}