interface AddButtonProps {
    text: string,
    redirectTo: string
}

function AddButton(props: AddButtonProps) {
    return (
        <a href={props.redirectTo} className="text-[12px] hover:bg-darkocean p-2 rounded transition-all"><span className="text-xl mr-2">+</span>{props.text}</a>
    )
}

export default AddButton;