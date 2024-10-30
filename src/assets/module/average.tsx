function average(total:number,items:number[]){
    const calculating = items.reduce((total,current)=>total + current,0)/total
    return calculating 
}

export default average