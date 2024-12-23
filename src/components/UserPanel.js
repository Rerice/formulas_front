import React, { useState, useEffect } from 'react'
import {
  getFormulas,
  getRequestHistory,
} from '../services/api'
import FormulaList from './FormulaList'
import ParameterInput from './ParameterInput'
import RequestHistory from './RequestHistory'

const UserPanel = ({ user = null }) => {
  const [requestHistory, setRequestHistory] = useState([])
  const [selectedFormula, setSelectedFormula] = useState(null)
  const [selectedFormulaParams, setSelectedFormulaParams] = useState(null)
  const [formulas, setFormulas] = useState([])

  useEffect(() => {
    const fetchFormulas = async () => {
      const data = await getFormulas()
      setFormulas(data)
    }
    fetchFormulas()

    const fetchRequestHistory = async () => {
      const data = await getRequestHistory(user.id)
      setRequestHistory(data)
    }
    fetchRequestHistory()
  }, [user.id])

  const selectFormula = (formula_id, formula_params) => {
    const formula = formulas.find((formula) => formula.id === formula_id)
    setSelectedFormula(formula)
    setSelectedFormulaParams(formula_params)
  }

  const handleRequestSaved = (request) => {
    setRequestHistory([...requestHistory, request])
  }

  return (
    <>
      <div>
        <h1>Пользовательская панель</h1>
        <FormulaList onSelect={setSelectedFormula} />
        {selectedFormula && (
          <ParameterInput
            formula={selectedFormula}
            userId={user.id}
            onRequestSaved={handleRequestSaved}
            params={selectedFormulaParams}
          />
        )}
        <RequestHistory
          userId={user.id}
          requests={requestHistory}
          formulas={formulas}
          selectFormula={selectFormula}
        />
      </div>
    </>
  )
}

export default UserPanel