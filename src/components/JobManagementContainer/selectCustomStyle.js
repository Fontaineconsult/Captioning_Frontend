export const customStyles = {
    container: (provided) => ({
        ...provided,

        display: 'inline-block',
        width: '160px',
        minHeight: '1px',
        textAlign: 'left',
        border: 'none',
    }),
    control: (provided) => ({
        ...provided,
        border: '2px solid #757575',
        borderRadius: '0',
        minHeight: '1px',
        height: '33px',
    }),
    input: (provided) => ({
        ...provided,
        minHeight: '1px',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        minHeight: '1px',
        paddingTop: '0',
        paddingBottom: '0',
        color: '#757575',
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        height: '100%',
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        minHeight: '1px',
        height: '19px',
        'margin-top': 'auto',
        'margin-bottom': 'auto'
    }),
    clearIndicator: (provided) => ({
        ...provided,
        minHeight: '1px',
    }),

    valueContainer: (provided) => ({
        ...provided,
        minHeight: '1px',
        height: '30px',
        paddingTop: '0',
        paddingBottom: '0',
    }),
    singleValue: (provided) => ({
        ...provided,
        minHeight: '1px',
        paddingBottom: '2px',
    }),
    placeholder: (provided) => ({
        ...provided,
        "font-size": "15px"
    }),
};