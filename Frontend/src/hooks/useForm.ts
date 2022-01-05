import { useEffect, useState } from "react"

export const useForm = (initialFields: any, cb: Function = () => { }) => {

    const [fields, setFields] = useState(initialFields)

    useEffect(() => {
        cb(fields)
    }, [fields])

    const handleChange = ({ target }: any) => {
        const field: string = target.name
        let value: boolean | number | string;
        switch (target.type) {
            case "number":
                value = +target.value
                break
            case "checkbox":
                value = target.checked
                break
            default:
                value = target.value
                break;
        }
        setFields((prevFields: any) => ({ ...prevFields, [field]: value }))
    }

    return [
        fields,
        handleChange,
        setFields
    ]
}