interface InputProps {
    name: string
    value?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    width?: string
    height?: string
    placeholder?: string
    color?: string
    bgColor?: string
}

function Input(props: InputProps) {
    let width = props.width ? props.width : "lg:w-96 max-sm:w-72 h-10"
    let height = props.height ? props.height : "lg:w-96 max-sm:w-72 h-10"
    let color = props.color ? props.color : "text-slate-50"
    let bgColor = props.bgColor ? props.bgColor : "bg-darkocean"

    return <input 
        value={props.value} 
        onChange={props.onChange ? props.onChange : () => {}} 
        name={props.name} 
        id={props.name}
        placeholder={props.placeholder} 
        className={`${color} ${bgColor} ${width} ${height} rounded outline-none placeholder-slate-500 p-2 caret-slate-500`}
    />
}

export default Input