

import React from 'react';
import Select from 'react-select';


const CustomSelect = (props) => {
  const { value, placeHolderTitle, onChangeHandler, cStyle, options, onHandleSelectSearch, searching=false, disabled=false, isMulti = false, } = props
  // const { customStyles } = useEmployees()

  const customStyles = {
    option: (provided, state) => ({
        ...provided,
        paddingLeft: state.data.isChild ? '20px' : '10px',
        fontSize: state.data.isChild ? '12px' : '14px',
        color: state.data.isChild ? '#495057' : '14px',
    }),
};

    const baseStyles = {
        control: (base, state) => ({
        ...base,
        fontSize: 12,
        padding: '0 8px',
        boxShadow: 'none',
        outline: 'none',
        border: 'none', // Remove all other borders
        borderBottom: state.isFocused ? '1px solid #3da5f4' : '1px solid #9e9e9e', // Blue bottom border on focus
        borderRadius: 0, // Remove border-radius to make it look like a line
        color: '#495057',
        transition: 'border-bottom-color 0.3s ease',
    }),
        placeholder: base => ({
        ...base,
        color: '#698592',
        }),
        
        option: base => ({
        ...base,
        paddingLeft: '10px',
        // fontSize: '14px',
        }),
        input: base => ({
        ...base,
        padding: 0,
        margin: 0,
        }),
        menu: (base) => ({
        ...base,
        zIndex: 9999999, // Ensures the dropdown menu appears above other elements
        // height:'50px'
        }),
        menuList: (base) => ({
        ...base,
        zIndex: 9999999, // Ensures the option list appears above other elements
        height:'110px',
        fontSize:12
        }),
    };

  // Add customStyle if cStyle is true
  const styles = cStyle ? {
    ...baseStyles,
    ...customStyles // Assuming customStyle is an object
  } : baseStyles;
  return (
    <div>
      <Select
        placeholder={ `${searching ? `Search ${placeHolderTitle}` :  `Select ${placeHolderTitle}`}`}
        components={{ IndicatorSeparator: null}}
        value={value}
        options={options}     
        onChange={onChangeHandler}    
        onInputChange={onHandleSelectSearch} 
        styles={styles}
        isDisabled={disabled}
        isMulti={isMulti}

      />
    </div>
  )
}

export default CustomSelect