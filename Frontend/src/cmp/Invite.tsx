import { useDispatch, useSelector } from 'react-redux';
import { utilService } from '../services/util.service';

export const Invite = () => {

    const { game } = useSelector(state => state.gameModule)
    const link: string = `http://localhost:3000/#/game/${game._id}/invite-login`

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
