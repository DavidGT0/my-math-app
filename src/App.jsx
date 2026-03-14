import { useState, useEffect, useRef } from 'react';
import { generateExercise } from './utils/mathUtils';
import './App.css';

function App() {
    const [difficulty, setDifficulty] = useState(10);
    const [operator, setOperator] = useState('+');
    const [nums, setNums] = useState({ n1: 0, n2: 0 });
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameStarted, setGameStarted] = useState(false);
    const [useTimer, setUseTimer] = useState(true);
    const [inputValue, setInputValue] = useState('');

    // 1. State חדש לפידבק
    const [feedback, setFeedback] = useState({ text: '', type: '' });
    // 2. יצירת רפרנס לתיבת הטקסט
    const inputRef = useRef(null);

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameStarted(true);
        setInputValue('');
        setFeedback({ text: '', type: '' }); // איפוס פידבק
        setNums(generateExercise(difficulty, operator));

        // החזרת הפוקוס מיד כשהמשחק מתחיל
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleCheck = () => {
        if (!inputValue) return;
        const opMap = { '×': '*', '÷': '/', '+': '+', '-': '-' };
        const correct = eval(`${nums.n1} ${opMap[operator]} ${nums.n2}`);

        if (parseInt(inputValue) === correct) {
            setScore(s => s + 1);
            setNums(generateExercise(difficulty, operator));
            setInputValue('');
            setFeedback({ text: 'כל הכבוד! תשובה נכונה! 🏆', type: 'success' });
        } else {
            setInputValue('');
            setFeedback({ text: 'לא נורא. נסה שוב! 💪', type: 'error' });
        }

        // 3. החזרת הפוקוס לתיבה אחרי כל בדיקה
        inputRef.current?.focus();
    };

    useEffect(() => {
        let timer;
        if (gameStarted && useTimer && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && useTimer) {
            setGameStarted(false);
        }
        return () => clearInterval(timer);
    }, [gameStarted, timeLeft, useTimer]);

    // מנקה את הפידבק ברגע שהילד מתחיל להקליד שוב
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        if (feedback.text) setFeedback({ text: '', type: '' });
    };

    return (
        <div className="game-container">
            <h1 className="game-title">חשבון בכיף! 🎈</h1>

            {!gameStarted ? (
                <div className="setup-screen">
                    {/* ... כפתורי ההגדרות נשארו ללא שינוי ... */}
                    <div className="section-box box-red">
                        {['+', '-', '×', '÷'].map(op => (
                            <button key={op} className={`kid-btn op-btn ${operator === op ? 'active' : ''}`} onClick={() => setOperator(op)}>{op}</button>
                        ))}
                    </div>
                    <div className="section-box box-blue">
                        {[10, 100, 1000].map(d => (
                            <button key={d} className={`kid-btn diff-btn ${difficulty === d ? 'active' : ''}`} onClick={() => setDifficulty(d)}>{d}</button>
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
                            ref={inputRef} /* חיבור הרפרנס לכאן */
                            value={inputValue}
                            onChange={handleInputChange} /* שימוש בפונקציה החדשה */
                            onKeyUp={(e) => e.key === 'Enter' && handleCheck()}
                            autoFocus
                            className="answer-input"
                            placeholder="?"
                            inputMode="numeric" /* חשוב למובייל - ראה הסבר למטה */
                            pattern="\d*" /* חשוב למובייל */
                        />
                    </div>

                    {/* 4. הצגת הפידבק */}
                    <div className="feedback-container">
                        {feedback.text && (
                            <span className={`feedback-msg ${feedback.type}`}>
                {feedback.text}
              </span>
                        )}
                    </div>

                    <button className="check-btn-big" onClick={handleCheck}>בדיקה! ✅</button>
                    <button className="stop-btn-big" onClick={() => setGameStarted(false)}>עצור משחק 🛑</button>
                </div>
            )}
        </div>
    );
}

export default App;