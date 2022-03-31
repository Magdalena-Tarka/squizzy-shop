const patterns = {
  namePattern: /^[A-zĄ-ż ,.-]*$/,
  streetPattern: /^[A-zĄ-ż0-9 ,.-/]*$/,
  numberPattern: /^[A-zĄ-ż0-9 ,.-/]*$/,
  phonePattern: /^[0-9 +-]*$/,
};

export const inputFields = [
  {
    name: 'firstName',
    label: 'first name',
    errorMsg: 'First name required, should be 2-20 ch., may include . , - special characters.',
    validationRules: {
      required: true,
      pattern: patterns.namePattern,
      minLength: 2,
      maxLength: 20,
    },
  },
  {
    name: 'lastName',
    label: 'last name',
    errorMsg: 'Last name is required, should be 2-20 ch., may include . , - special characters.',
    validationRules: {
      required: true,
      pattern: patterns.namePattern,
      minLength: 2,
      maxLength: 20,
    },
  },
  {
    name: 'street',
    label: 'street',
    errorMsg: 'Street should be 2-20 ch., may include . , - / special characters and numbers.',
    validationRules: {
      pattern: patterns.streetPattern,
      minLength: 2,
      maxLength: 20,
    },
  },
  {
    name: 'number',
    label: 'number',
    errorMsg: 'Number should be 1-10 ch., may include . , - special characters and letters.',
    minLength: 1,
    maxLength: 10,
    validationRules: {
      pattern: patterns.numberPattern,
      minLength: 1,
      maxLength: 10,
    },
  },
  {
    name: 'city',
    label: 'city',
    errorMsg: 'City required, should be 2-20 ch., may include . , - special characters.',
    validationRules: {
      required: true,
      pattern: patterns.namePattern,
      minLength: 2,
      maxLength: 20,
    },
  },
  {
    name: 'phone',
    label: 'phone nr',
    errorMsg: 'Phone required, number should be 9-17 ch., may include + - special characters.',
    validationRules: {
      required: true,
      pattern: patterns.phonePattern,
      minLength: 9,
      maxLength: 17,
    },
  },
];
