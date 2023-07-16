import Input from "./Input";

interface FormInputProps {
    name: string,
    inputType: string
    label: string,
    placeholder?: string,
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    errorMessage: string,
    errorEval: boolean
}

export function FormInput(props: FormInputProps) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label>{props.label}</label>
            <Input type={props.inputType} name={props.name} width={"w-full"} bgColor={"bg-midnight"} value={props.value} onChange={props.onChange} placeholder={props.placeholder}/>
            <span className="text-sm text-rose-500 font-medium">{props.errorEval ? props.errorMessage : ""}</span>
        </div>
    )
}