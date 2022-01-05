import React from 'react'

interface PropType {
    word: string
}

export const WordToLines = ({ word }: PropType) => {

    const getLines = () => {
        return word.split('').map((letter: string) => '_ ').join('')
    }

    return (
        <section className="word-to-lines flex align-center direction-col">
            {getLines()}
        </section>
    )
}
