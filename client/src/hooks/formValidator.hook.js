import {useState} from 'react'

const useFormValidator = (inputs = []) => {
  const [isTried, setIsTried] = useState(false)
  const validates = []
  const handlers = []

  const triedHandler = func => {
    const isCorrect = []
    const values = []
    validates.forEach(validate => {
      const [isCorr, val] = validate()
      isCorrect.push(isCorr)
      values.push(val)
    })

    if (!isTried) {
      if (!isCorrect.reduce((acc, valid) => acc && valid)) {
        setIsTried(true)
        handlers.forEach(handler => handler(null, true))
      }
    }
    if (isCorrect.reduce((acc, valid) => acc && valid)) {
      func(...values)
    }
  }

  const valueHandler = (error, setError, validate, isTried) => (_, tried = false) => {
    const [isCorrect] = validate()

    if (!isCorrect) {
      if (!error) setError(true)
    } else if (error && (isTried || tried)) {
      setError(false)
    }
  }

  const validateInput = (inputRef, condition) => () => {
    const value = inputRef.current.value
    return [condition(value), value]
  }

  const returnable =  inputs.map(input => {
    const {ref, errorState, condition} = input
    const validate = validateInput(ref, condition)
    const handler = valueHandler(...errorState, validate, isTried)

    validates.push(validate)
    handlers.push(handler)

    return [input.ref, handler, errorState[0]]
  })

  returnable.push([triedHandler, isTried])

  return returnable
}

export default useFormValidator
