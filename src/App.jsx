import { useState, useEffect, useRef, useCallback } from 'react';
import { generateExercise } from './utils/mathUtils';
import './App.css';

function App() {
    const [difficulty, setDifficulty] = useState(10);
    const [operator, setOperator] = useState('+');
    const [nums, setNums] = useState({ n1: 0, n2: 0 });
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(() => {
        const saved = localStorage.getItem('mathGameBestScore');
        return saved ? parseInt(saved) : 0;
    });
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameStarted, setGameStarted] = useState(false);
    const [useTimer, setUseTimer] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [feedback, setFeedback] = useState({ text: '', type: '' });
    const inputRef = useRef(null);

    const scoreRef = useRef(score);
    useEffect(() => {
        scoreRef.current = score;
    }, [score]);

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameStarted(true);
        setInputValue('');
        setFeedback({ text: '', type: '' });
        setNums(generateExercise(difficulty, operator));
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleStopGame = useCallback(() => {
        const finalScore = scoreRef.current;
        setBestScore(currentBest => {
            if (useTimer && finalScore > currentBest) {
                localStorage.setItem('mathGameBestScore', finalScore.toString());
                return finalScore;
            }
            return currentBest;
        });
        setGameStarted(false);
    }, [useTimer]); 

    const handleCheck = () => {
        if (!inputValue) return;

        let correct;
        const { n1, n2 } = nums;

        switch (operator) {
            case '+': correct = n1 + n2; break;
            case '-': correct = n1 - n2; break;
            case '×': correct = n1 * n2; break;
            case '÷': correct = n1 / n2; break;
            default: correct = 0;
        }

        if (parseInt(inputValue) === correct) {
            setScore(s => s + 1);
            setNums(generateExercise(difficulty, operator));
            setInputValue('');
            setFeedback({ text: 'כל הכבוד! 🏆', type: 'success' });
        } else {
            setInputValue('');
            setFeedback({ text: 'נסה שוב! 💪', type: 'error' });
        }
        inputRef.current?.focus();
    };

    useEffect(() => {
        let timer;

        if (gameStarted && useTimer) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleStopGame();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [gameStarted, useTimer, handleStopGame]); 

    return (
        <div className="game-container">
            <h1 className="game-title">חשבון בכיף! 🎈</h1>

            {!gameStarted ? (
                <div className="setup-screen">
                    {useTimer && (
                        <div className="best-score-badge">
                            שיא נוכחי: ⭐ {bestScore}
                        </div>
                    )}

                    <div className="section-box box-red">
                        {['+', '-', '×', '÷'].map(op => (
                            <button key={op} className={`kid-btn ${operator === op ? 'active' : ''}`} onClick={() => setOperator(op)}>{op}</button>
                        ))}
                    </div>

                    <div className="section-box box-blue">
                        {[10, 100, 1000].map(d => (
                            <button key={d} className={`kid-btn ${difficulty === d ? 'active' : ''}`} onClick={() => setDifficulty(d)}>{d}</button>
                        ))}
                    </div>

                    <div className="section-box box-yellow">
                        <span className="label-text">טיימר:</span>
                        <div className={`switch ${useTimer ? 'on' : 'off'}`} onClick={() => setUseTimer(!useTimer)}>
                            <div className="handle"></div>
                        </div>
                        <span className="timer-text">{useTimer ? "פעיל" : "כבוי"}</span>
                    </div>

                    <button className="start-btn-big" onClick={startGame}>קדימה לשחק! 🚀</button>
                </div>
            ) : (
                <div className="play-screen">
                    <div className="stats-container">
                        <div className="stat-bubble">⭐ {score}</div>
                        {useTimer && <div className="stat-bubble timer-bubble">⏱️ {timeLeft}</div>}
                    </div>

                    <div className="exercise-display" dir="ltr">
                        {nums.n1} {operator} {nums.n2} =
                    </div>

                    <div className="input-container">
                        <input
                            type="number"
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                setFeedback({ text: '', type: '' });
                            }}
                            onKeyUp={(e) => e.key === 'Enter' && handleCheck()}
                            autoFocus
                            className="answer-input"
                            placeholder="?"
                            inputMode="numeric"
                        />
                    </div>

                    <div className="feedback-container">
                        {feedback.text && <span className={`feedback-msg ${feedback.type}`}>{feedback.text}</span>}
                    </div>

                    <button className="check-btn-big" onClick={handleCheck}>בדיקה! ✅</button>
                    <button className="stop-btn-big" onClick={handleStopGame}>עצור משחק 🛑</button>
                </div>
            )}
        </div>
    );
}

export default App;