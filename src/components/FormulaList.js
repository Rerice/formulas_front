import React, { useEffect, useState } from 'react';
import { getFormulas } from '../services/api';
import './FormulaList.css';

const FormulaList = ({ onSelect }) => {
    const [formulas, setFormulas] = useState([]);

    useEffect(() => {
        const fetchFormulas = async () => {
            const data = await getFormulas();
            setFormulas(data);
        };
        fetchFormulas();
    }, []);

    return (
        <div className="formula-list">
            <h2>Формулы</h2>
            <div className="button-container">
                {formulas.map((formula) => (
                    <button key={formula.id} className="formula-button" onClick={() => onSelect(formula)}>
                        {formula.formula_template}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FormulaList;
