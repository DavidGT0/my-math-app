const Settings = ({ currentOp, setOp, currentDiff, setDiff }) => {
    const ops = ['+', '-', '×', '÷'];
    const diffs = [10, 100, 1000];

    return (
        <div className="settings">
            <div className="setting-group">
                <span>פעולה:</span>
                {ops.map(op => (
                    <button
                        key={op}
                        className={currentOp === op ? 'active' : ''}
                        onClick={() => setOp(op)}
                    >
                        {op}
                    </button>
                ))}
            </div>
            <div className="setting-group">
                <span>עד מספר:</span>
                {diffs.map(d => (
                    <button
                        key={d}
                        className={currentDiff === d ? 'active' : ''}
                        onClick={() => setDiff(d)}
                    >
                        {d}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Settings;