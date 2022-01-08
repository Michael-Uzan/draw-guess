import { Draw } from '../cmp/Draw'
import { Guess } from '../cmp/Guess';
import IUser from '../interface/IUser.interfacets';
import { userService } from '../services/user.service'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { GameState } from '../store/reducers/gameReducer';
import { UserState } from '../store/reducers/userReducer';
import IGame from '../interface/IGame.interfacets';

interface PropType {
    historyPush: Function
}


export const DrawGuess = ({ historyPush }: PropType) => {

    const { game, roundIdx }: GameState = useSelector((state: RootState) => state.gameModule)
    const { loggedinUser }: UserState = useSelector((state: RootState) => state.userModule)

    return (
        <section className="draw-guess">
            {userService.IsDrawing(game as IGame, roundIdx, loggedinUser as IUser) ? <Draw /> : <Guess historyPush={historyPush} />}
        </section>
    )
}
