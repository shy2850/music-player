interface ProgressProps {
    className:string
    value?:number
    max?:number
    onChange?:Function
}

interface PlayListProps {
    init:Function
    list:any[]
    current:number
    onChange:Function
}