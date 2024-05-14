import React, { useEffect, useRef, useState } from 'react'

const SelectInput = ({ id, label, error, modelValue, onUpdateModelValue, ...rest }) => {
    const [selected, setSelected] = useState(modelValue)
    const inputRef = useRef(null)

    useEffect(() => {
        setSelected(modelValue)
    }, [modelValue])

    const handleSelectedChange = (e) => {
        setSelected(e.target.value)
        onUpdateModelValue(e.target.value)
    }

    const handleFocus = () => {
        inputRef.current.focus();
    };

    const handleSelect = () => {
        inputRef.current.select();
    };

    return (
        <div className={rest.class}>
            {label && <label className="form-label" htmlFor={id}>{label}:</label>}
            <select
                id={id}
                ref={inputRef}
                value={selected}
                onChange={handleSelectedChange}
                {...rest}
                className={`form-select ${error ? 'error' : ''}`}
            >
                {rest.children}
            </select>
            {error && <div className="form-error">{error}</div>}
        </div>
    )
}

SelectInput.defaultProps = {
    id: `select-input-${uuid()}`,
}

export default SelectInput