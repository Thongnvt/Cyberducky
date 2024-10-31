import React from 'react';

const keys = [
    'ESC', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'
];

function Keyboard({ onKeyClick }) {
    return (
        <div className="keyboard">
            {keys.map(key => (
                <button key={key} onClick={() => onKeyClick(key)}>
                    {key}
                </button>
            ))}
        </div>
    );
}

export default Keyboard;
