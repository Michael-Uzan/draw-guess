import { utilService } from "../services/util.service";

export const SelectPreview = ({ value, display, setChosenValue }: PropType) => {

    const getActiveClass = (display: string): string => {
        return (value === display) ? 'active' : ''
    }

    return (
        <div className={getActiveClass(display)} onClick={() => setChosenValue(display)}>{utilService.getCapitalDisplay(display)}</div>
    )
}

interface PropType {
    value: string,
    display: string,
    setChosenValue: Function
}
