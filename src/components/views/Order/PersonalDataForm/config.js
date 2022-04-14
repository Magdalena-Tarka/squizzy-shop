const patterns = {
  namePattern: {
    label: 'namePattern',
    pattern: /^[A-zĄ-ż ,.-]*$/,
  },
  streetPattern: {
    label: 'streetPattern',
    pattern: /^[A-zĄ-ż0-9 ,.-/]*$/,
  },
  numberPattern: {
    label: 'numberPattern',
    pattern: /^[A-zĄ-ż0-9 ,.-/]*$/,
  },
  phonePattern: {
    label: 'phonePattern',
    pattern: /^[0-9 +-]*$/,
  },
};

export const inputFields = [
  {
    name: 'firstName',
    label: 'first name',
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
    validationRules: {
      required: true,
      pattern: patterns.streetPattern,
      minLength: 2,
      maxLength: 20,
    },
  },
  {
    name: 'number',
    label: 'number',
    minLength: 1,
    maxLength: 10,
    validationRules: {
      required: true,
      pattern: patterns.numberPattern,
      minLength: 1,
      maxLength: 10,
    },
  },
  {
    name: 'city',
    label: 'city',
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
    validationRules: {
      required: true,
      pattern: patterns.phonePattern,
      minLength: 9,
      maxLength: 17,
    },
  },
];
