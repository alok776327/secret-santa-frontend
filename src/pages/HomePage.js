import { Link } from "react-router-dom";
import "../App.css";

export default function App() {
  return (
    <div className="landing-container">
      <div className="overlay" />

      <div className="content-box">
        <h1 className="title">🎅 Secret Santa Generator</h1>
        <p className="subtitle">
          Create a fun & magical gift exchange with your friends! 🎁✨
        </p>

        <div className="btn-group">
          <Link to="/create" className="btn primary">
            🎁 Create New Game
          </Link>

          <Link to="/join" className="btn secondary">
            🔗 Join Existing Game
          </Link>
        </div>

        <p className="footer-text">
          Made with ❤️ for holiday fun!
        </p>
      </div>
    </div>
  );
}
