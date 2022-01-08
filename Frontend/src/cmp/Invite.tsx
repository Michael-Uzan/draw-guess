import { useSelector } from 'react-redux';
import { utilService } from '../services/util.service';
import { RootState } from '../store';
import { GameState } from '../store/reducers/gameReducer';

export const Invite = () => {

    const { game }: GameState = useSelector((state: RootState) => state.gameModule)
    const link: string = (process.env.NODE_ENV === 'production') ?
        `https://monday-draw-guess-exam.herokuapp.com/#/game/${game?._id}/invite-login` :
        `http://localhost:3000/#/game/${game?._id}/invite-login`

    return (
        <section className="invite tac">
            <h1>Invite a friend to play:</h1>
            <div className="flex direction-col align-center">
                <button onClick={() => utilService.copyToClipboard(link)}>Copy to Cipboard</button>
                <button>
                    <a target="_blank" href={link}>Open new window</a>
                </button>
            </div>
        </section>
    )
}
