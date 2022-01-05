import React from 'react'
import IUser from '../interface/IUser.interfacets'

interface PropType {
    user: IUser | null
}

export const Avatar = ({ user }: PropType) => {

    if (!user) return (
        <section className="avatar flex direction-col align-center">
            <img className="avatar-img" src="https://thumbs.dreamstime.com/b/sticker-cartoon-question-mark-creative-illustrated-149241670.jpg" />
            <h3>Invite someone...</h3>
            <div className="points flex direction-row align-center">
                <h4>0</h4>
                <img className="img-coin" src="https://static.vecteezy.com/system/resources/previews/002/297/996/non_2x/gold-coin-money-one-coin-lucky-coin-cartoon-style-free-vector.jpg" />
            </div>
        </section>
    )

    return (
        <section className="avatar flex direction-col align-center">
            <img className="avatar-img" src={user.img} />
            <h3>{user.username}</h3>
            <div className="points flex direction-row align-center">
                <h4>{user.points}</h4>
                <img className="img-coin" src="https://static.vecteezy.com/system/resources/previews/002/297/996/non_2x/gold-coin-money-one-coin-lucky-coin-cartoon-style-free-vector.jpg" />
            </div>
        </section>
    )
}
