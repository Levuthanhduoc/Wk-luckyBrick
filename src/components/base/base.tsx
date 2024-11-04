import React from 'react'

const BaseHeader = React.lazy(()=>import('./baseHeader'))
const BaseFooter = React.lazy(()=>import('./baseFooter'))
const BaseContent = React.lazy(()=>import('./baseContent'))
const ToTop = React.lazy(()=>import('../extra/goToptop'))
function Base (){
    return(
        <>
            <BaseHeader/>
            <BaseContent/>
            <ToTop/>
            <BaseFooter/>
        </>
    )
}

export default Base