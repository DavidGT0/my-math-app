const ScoreBoard = ({ score, time }) => {
    return (
        <div className="score-board">
            <div className="stat">⭐ ניקוד: <span>{score}</span></div>
            <div className={`stat ${time < 10 ? 'danger' : ''}`}>
                ⏱️ זמן: <span>{time}</span>
            </div>
        </div>
    );
};

export default ScoreBoard;