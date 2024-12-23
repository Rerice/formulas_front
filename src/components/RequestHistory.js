 import React from 'react';
import './RequestHistory.css';

const RequestHistory = ({ requests, formulas, selectFormula }) => {
    return (
        <div className="request-history">
            <h2>История запросов</h2>
            <ul className="request-list">
                {requests.map((request) => (
                    <li key={request.id} className="request-item">
                        <button
                            className="request-button"
                            onClick={() => {
                                selectFormula(request.formula, request.parameters);
                            }}
                        >
                            Формула: {formulas.find((formula) => formula.id === request.formula)?.formula_template}, 
                            Параметры: 
                            {Object.entries(request.parameters).map(([key, value]) => (
                                <span key={key} className="parameter-badge">
                                    {key}: {value}
                                </span>
                            ))}
                            , Результат: {request.result}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RequestHistory;
