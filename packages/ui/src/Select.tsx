"use client"

export const Select = ({onSelect, options}: {
    onSelect: (value: string) => void,
    options: {
        key: string;
        value: string;
    }[];
}) => {
    return <select onChange={(e) => {
        onSelect(e.target.value)
    }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:boder-blue-500 block w-full p-2.5">
         {options.map(option => <option key={option.key}>{option.value}</option>)}
    </select>
}