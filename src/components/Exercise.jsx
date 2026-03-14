const Exercise = ({ n1, n2, op }) => {
    return (
        <div className="exercise-card">
            <span className="num">{n1}</span>
            <span className="op">{op}</span>
            <span className="num">{n2}</span>
            <span className="equal">=</span>
        </div>
    );
};

export default Exercise;