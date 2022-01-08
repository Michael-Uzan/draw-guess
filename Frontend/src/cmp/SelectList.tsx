import { SelectPreview } from "./SelectPreview"

interface PropType {
    setChosenValue: Function,
    value: string,
    displays: string[]
}

export const SelectList = ({ setChosenValue, value, displays }: PropType) => {

    return (
        <section className="selectList flex space-around">
            {displays.map((display: string) => (<SelectPreview key={display} value={value} display={display} setChosenValue={setChosenValue} />))}
        </section>
    )
}

