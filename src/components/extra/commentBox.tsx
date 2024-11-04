import { Divider, Rating, Stack, Typography } from "@mui/material"

function CommentBox(_id:number|string){
    return(
        <>  
            <Divider orientation="horizontal" flexItem/>
            <Stack>
                <Typography>time</Typography>
                <Stack>
                    <Rating value={5} readOnly />
                    <Typography>5</Typography>
                </Stack>
                <Typography>title</Typography>
                <Typography>User name</Typography>
                <Typography>content</Typography>
            </Stack>
        </>
    )
}

export default CommentBox