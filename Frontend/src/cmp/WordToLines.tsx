interface PropType {
    word: string | null | undefined
}

export const WordToLines = ({ word }: PropType) => {

    const getLines = () => {
        return word ? word.split('').map((letter: string) => '_ ').join('') : ''
    }

    return (
        <section className="word-to-lines flex align-center direction-col">
            {getLines()}
        </section>
    )
}
