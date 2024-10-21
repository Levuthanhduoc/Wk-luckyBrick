import { Box, Skeleton } from "@mui/material";

function SkeletonExtra(){
    return (
        <>
            <Box sx={{display:"flex",flexDirection:"column",gap:"10px"}}>
                <Skeleton variant="rounded" width={"100%"} height={118} />
                <Skeleton variant="rounded" width={"100%"} height={118} />
                <Skeleton variant="rounded" width={"100%"} height={118} />
                <Skeleton variant="rounded" width={"100%"} height={118} />
                <Skeleton variant="rounded" width={"100%"} height={118} />
            </Box>
        </>
    )
}

export default SkeletonExtra