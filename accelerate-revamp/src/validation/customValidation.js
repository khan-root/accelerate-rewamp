export function validateInput(fieldName, input) {
    // console.log('input', input)
  if (!input) {
    return { isValid: false, message: `${fieldName} cannot be empty.` };
  }

  if (/^\s/.test(input)) {
    return { isValid: false, message: `${fieldName} cannot start with empty spaces.` };
  }

  if (/^[^a-zA-Z0-9]/.test(input)) {
    return { isValid: false, message: `${fieldName} cannot start with a special character`};
  }

  return { isValid: true, message: "" };
}
export function validateEmail(fieldName, input) {
    // console.log('input', input)
  if (!input) {
    return { isValid: false, message: `${fieldName} cannot be empty.` };
  }

  if (/^\s/.test(input)) {
    return { isValid: false, message: `${fieldName} cannot start with empty spaces.` };
  }

  if (/^[^a-zA-Z0-9]/.test(input)) {
    return { isValid: false, message: `${fieldName} cannot start with a special character`};
  }
  if (!/@/.test(input)) {
    return { isValid: false, message: `${fieldName} not a valid email address` };
  }


  return { isValid: true, message: "" };
}