export const ruleFunctions = {
  required: text => text && text.length > 0,
  pattern: (text, pattern) => pattern && pattern.pattern.test(text),
  minLength: (text, minLength) => text && text.length ? text.length >= minLength : true,
  maxLength: (text, maxLength) => text && text.length ?  text.length <= maxLength : true,
};

export const errorMessages = {
  required: 'is required',
  minLength: 'should be min {value} characters',
  maxLength: 'should be max {value} characters',
  pattern: {
    namePattern: 'may include only . , - special characters',
    streetPattern: 'may include only . , - / special characters',
    numberPattern: 'may include only . , - special characters',
    phonePattern: 'may include only + - special characters',
  },
};
