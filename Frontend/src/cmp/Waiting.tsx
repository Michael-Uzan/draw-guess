import React from 'react'
import waiting from '../assets/imgs/waiting.gif';

export const Waiting = ({ historyPush }: any) => {

    return (
        <section className="waiting tac">
            <h1> Other player is choosing a word...</h1>
            <img className="waiting-svg" src={waiting} />
        </section>
    )
}
