import { Link } from "react-router-dom"

export const HomePage = () => {
    return (
        <section className="home-page tac">
            <h1>Welcome!</h1>
            <button>
                <Link to='/game' >Create a new Game</Link>
            </button>
        </section>
    )
}
