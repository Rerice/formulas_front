import React, { useState, useEffect} from 'react';
import { saveRequest } from '../services/api';
import './ParameterInput.css';

const ParameterInput = ({ formula, userId, onRequestSaved, params = {} }) => {
    const [parameters, setParameters] = useState({})
    const [result, setResult] = useState(null);
    useEffect(() => {
      setParameters(params)
    }, [params])
  
    const handleChange = (e) => {
      setParameters((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        try {
            let evaluatedFormula = formula.formula_template.replace(/\^/g, '**');
            evaluatedFormula = evaluatedFormula.replace(/([a-zA-Z_]\w*)/g, (match) => parameters[match] || 0);
            const calculatedResult = eval(evaluatedFormula);
            setResult(calculatedResult);
            const saveResult = await saveRequest(userId, formula.id, parameters, calculatedResult);
            onRequestSaved(saveResult);
        } catch (error) {
            console.error("Ошибка при вычислении формулы:", error);
            setResult("Ошибка при вычислении");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="parameter-input">
                <h3>Введите параметры для {formula.formula_template}</h3>
                {formula.parameter_names.map((param, index) => (
                    <div key={index} className="input-group">
                        <label>
                            {param}:
                            <input
                                type="text"
                                name={param}
                                value={(parameters && parameters[param]) || ''}
                                onChange={handleChange}
                                required
                                className="input-field"
                            />
                        </label>
                    </div>
                ))}
                <button type="submit" className="submit-button">Рассчитать</button>
            </form>
            {result !== null && (
                <div className="result">
                    <h4>Результат: {result}</h4>
                </div>
            )}
        </div>
    );
};

export default ParameterInput;
