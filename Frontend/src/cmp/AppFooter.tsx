import gitHubLogo from '../assets/imgs/github-logo.png';

export function AppFotter() {
    return (
        <footer className="main-footer full">
            <div className="footer-logo flex direction-col align-center">
                <p>&copy; Draw & Guess by Michael Uzan</p>
                <img src="data:image/png;base64,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" />
            </div>
            <div className="footer-desc">
                <ul className="social-links clean-list flex direction-row justify-center">
                    <li>
                        <a target="_blank" href="https://github.com/Michael-Uzan/draw-guess">
                            <p>See Code on GitHub Here: </p>
                            <img src={gitHubLogo} />
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}