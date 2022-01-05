import { SelectPreview } from "./SelectPreview"

export const SelectList = ({ setChosenValue, value, displays }: PropType) => {

    return (
        <section className="selectList flex space-around">
            {displays.map((display: string) => (<SelectPreview value={value} display={display} setChosenValue={setChosenValue} />))}
        </section>
    )
}

interface PropType {
    setChosenValue: Function,
    value: string,
    displays: string[]
}
