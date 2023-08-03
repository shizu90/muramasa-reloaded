interface DropdownProps {
    options: Array<any>,
    placeholder?: string,
    control: {controlState: any, setControlState: Function},
    styles?: {width: string, height: string}
}

function Dropdown(props: DropdownProps) {
    return (
        <div className="group h-auto relative">
            <input 
            type="text" className={(props.styles ? `${props.styles.width} ${props.styles.height}` : "w-9") + " p-2 outline-none rounded bg-midnight cursor-pointer"} 
            placeholder={props.placeholder} readOnly value={props.control.controlState + ""}/>
            <div className="bg-darkocean absolute shadow-lg shadow-slate-90 hidden group-hover:flex flex-col gap-2 overflow-y-auto p-2 border-t-[6px] border-midnight rounded">
                {props.options.map((option: any) => (
                    <span className="hover:text-slate-50 cursor-pointer transition-all" key={option} onClick={() => props.control.setControlState(option)}>{option}</span>
                ))}
            </div>
        </div>
    )
}

export default Dropdown;