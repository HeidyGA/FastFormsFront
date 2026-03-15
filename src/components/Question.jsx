import React, { useState, useEffect, memo } from 'react';

const Question = memo(({ id, type, onChange }) => {
  const [statement, setStatement] = useState('');
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    const data = { statement, type };
    if (type === 'unique_choice') {
      data.options = choices.map(c => c.value);
    }
    onChange(id, data);
  }, [statement, choices, id, type, onChange]);

  const handleChoiceChange = (choiceId, value) => {
    setChoices(prev => prev.map(c => c.id === choiceId ? { ...c, value } : c));
  };

  return (
    <div >
      <label htmlFor={`input-${id}`}>Enunciado de la pregunta ({type}):</label>
      <input 
        id={`input-${id}`}
        type="text" 
        value={statement}
        onChange={(e) => setStatement(e.target.value)}
        placeholder="Escribe tu pregunta aquí..."
      />

      {type === 'unique_choice' && (
        <div>
          {choices.map((choice) => (
            <input 
              key={choice.id}
              value={choice.value}
              onChange={(e) => handleChoiceChange(choice.id, e.target.value)}
              placeholder="Opción"
            />
          ))}
          <button onClick={() => setChoices([...choices, { id: crypto.randomUUID(), value: '' }])}>
            + Opción
          </button>
        </div>
      )}
    </div>
  );
});

export default Question;