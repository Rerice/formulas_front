import React, { useState, useEffect } from 'react';
import { getFormulas, addFormula, deleteFormula } from '../services/api';
import './AdminPanel.css';

const AdminPanel = () => {
    const [formulas, setFormulas] = useState([]);
    const [newFormula, setNewFormula] = useState({ template: '', parameters: '' });

    useEffect(() => {
        const fetchFormulas = async () => {
            const data = await getFormulas();
            setFormulas(data);
        };
        fetchFormulas();
    }, []);

    const handleAddFormula = async (e) => {
        e.preventDefault();
        const parametersArray = newFormula.parameters.split(',').map(param => param.trim());
        const formula = { formula_template: newFormula.template, parameter_names: parametersArray };
        await addFormula(formula);
        setNewFormula({ template: '', parameters: '' });
        const updatedFormulas = await getFormulas();
        setFormulas(updatedFormulas);
    };

    const handleDeleteFormula = async (id) => {
        await deleteFormula(id);
        const updatedFormulas = await getFormulas();
        setFormulas(updatedFormulas);
    };

    return (
        <div className="admin-panel">
            <h2>Панель администратора</h2>
            <form onSubmit={handleAddFormula} className="formula-form">
                <input
                    type="text"
                    placeholder="Шаблон формулы"
                    value={newFormula.template}
                    onChange={(e) => setNewFormula({ ...newFormula, template: e.target.value })}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Список параметров (через запятую)"
                    value={newFormula.parameters}
                    onChange={(e) => setNewFormula({ ...newFormula, parameters: e.target.value })}
                    required
                    className="input-field"
                />
                <button type="submit" className="submit-button">Добавить формулу</button>
            </form>
            <h3>Список формул</h3>
            <ul className="formula-list">
                {formulas.map(formula => (
                    <li key={formula.id} className="formula-item">
                        {formula.formula_template}
                        <button onClick={() => handleDeleteFormula(formula.id)} className="delete-button">Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;