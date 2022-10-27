export default function ActionDataInput({type, name, defaultValue}: any) {
    return (
        <input type={type} name={name} defaultValue={defaultValue} 
            className="px-2 py-1 border border-red-400 bg-stone-700 rounded" 
        />
    )
}