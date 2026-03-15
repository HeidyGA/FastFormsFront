import React, { useState, useCallback } from 'react';
import Question from '../components/Question';

const CreateSurvey = () => {
  const [questions, setQuestions] = useState([]);
  const [answersData, setAnswersData] = useState({});
  const [showSelector, setShowSelector] = useState(false);

  const questionTypes = ['open', 'unique_choice', 'yes_no'];

  const handleQuestionChange = useCallback((id, data) => {
    setAnswersData(prev => ({ ...prev, [id]: data }));
  }, []);

  const handleAddQuestion = (type) => {
    const newId = crypto.randomUUID(); 
    setQuestions(prev => [...prev, { id: newId, type }]);
    setShowSelector(false);
  };

  const handleRemoveQuestion = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
    setAnswersData(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleSubmit = () => {
    
    const values = Object.values(answersData);
    const hasEmptyStatements = values.some(q => !q.statement.trim());
    
    if (questions.length === 0) return alert("Añade al menos una pregunta");
    if (hasEmptyStatements) return alert("Todas las preguntas deben tener un enunciado");

    console.log('Payload Final para enviar:', answersData);
    alert("Encuesta enviada con éxito (mira la consola)");
  };


  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Configurador de Encuesta</h1>

      {questions.length === 0 ? (
        <p>No hay preguntas aún. Usa el botón "+" para empezar.</p>
      ) : (
        <div style={{ marginBottom: '20px' }}>
          {questions.map((q) => (
            <div key={q.id} style={{ position: 'relative', marginBottom: '15px' }}>
              <Question 
                id={q.id} 
                type={q.type} 
                onChange={handleQuestionChange} 
              />
              <button 
                onClick={() => handleRemoveQuestion(q.id)}
                style={{ position: 'absolute', top: '10px', right: '10px', color: 'red' }}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Selector de Preguntas Mejorado */}
      <div 
        onMouseEnter={() => setShowSelector(true)} 
        onMouseLeave={() => setShowSelector(false)}
        style={{ marginBottom: '40px', textAlign: 'center' }}
      >
        <button style={{ fontSize: '20px', padding: '10px 20px' }}>+ Añadir Pregunta</button>
        {showSelector && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
            {questionTypes.map((type) => (
              <button key={type} onClick={() => handleAddQuestion(type)}>
                {type.replace('_', ' ')}
              </button>
            ))}
          </div>
        )}
      </div>

      <hr />
      <button 
        onClick={handleSubmit} 
        style={{ width: '100%', padding: '15px', background: '#4CAF50', color: 'white', fontWeight: 'bold' }}
      >
        Enviar Encuesta
      </button>
    </div>
  );
};

export default CreateSurvey;