import { useState } from 'react';

const InputArea = ({ onAnswer, disabled }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value) return;

        const isCorrect = onAnswer(value);
        if (isCorrect) {
            setValue(''); // מנקה רק אם צדק
        }
    };

    return (
        <form className="input-area" onSubmit={handleSubmit}>
            <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={disabled}
                placeholder="?"
                autoFocus
            />
            <button type="submit" className="check-btn" disabled={disabled}>
                בדוק!
            </button>
        </form>
    );
};

export default InputArea;