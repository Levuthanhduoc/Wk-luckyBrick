import { Box, Divider, Rating, Stack, Typography } from "@mui/material";
import HTMLReactParser from "html-react-parser/lib/index";
import { getHtml } from "../../extra/richTextForm";
import { JSONContent } from "@tiptap/core";

interface review{
    name:string,
    title:string,
    rating:string,
    comment:JSONContent,
    time:string,
}

export default function ReviewBox(props:review) {
    return(
        <>
            <Box>
                <Stack direction={"row"} gap={"10px"} alignItems={"center"}>
                    <Typography>{props.name}</Typography>
                    <Typography fontSize={"0.875rem"} lineHeight= {"1.1875rem"} >{props.time}</Typography>
                </Stack>
                <Rating defaultValue={Number(props.rating)} size="small" readOnly/>
                <Typography fontWeight={"500"} fontSize={"1.25rem"} lineHeight={"1.75rem"}>{props.title}</Typography>
                {HTMLReactParser(getHtml(props.comment))}
            </Box>
            <Divider/>
        </>
    )
}