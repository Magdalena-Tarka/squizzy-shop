import { inputFields } from '../components/views/Order/PersonalDataForm/config';
import { IInitialState, IOrderForm, PersonalData } from '../types';

const orderForm = {} as IOrderForm;
const personalData = {} as PersonalData;
inputFields.forEach(field => {
  orderForm[field.name] = {
    isInvalid: false,
    isTouched: false,
    errorMsgs: '',
  };
  personalData[field.name] = '';
});

export const initialState: IInitialState = {
  products: {
    data: [],
    /*data: [
      {
        id: '1',
        name: 'vegetable red smoothie',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        image: '/images/1.jpeg',
        ingredients: [
          'radish',
          'beetroot',
          'celery',
          'parsley',
        ],
        options: [
          { size: '300ml', price: 9, default: true },
          { size: '500ml', price: 12 },
        ],
        fruit: false,
        vege: true,
        pressedJuice: false,
        milk: false,
      },
      {
        id: '2',
        name: 'yellow pressed juice',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        image: '/images/2.jpeg',
        ingredients: [
          'orange',
          'lemon',
          'ginger',
        ],
        options: [
          { size: '300ml', price: 7, default: true },
          { size: '500ml', price: 10 },
        ],
        fruit: true,
        vege: true,
        pressedJuice: true,
        milk: false,
      },
      {
        id: '3',
        name: 'milk red smoothie',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        image: '/images/3.jpeg',
        ingredients: [
          'strawberry',
          'banana',
          'milk',
          'coconut',
        ],
        options: [
          { size: '300ml', price: 9, default: true },
          { size: '500ml', price: 12 },
        ],
        fruit: true,
        vege: false,
        pressedJuice: false,
        milk: true,
      },
      {
        id: '4',
        name: 'milk brown smoothie',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        image: '/images/4.jpeg',
        ingredients: [
          'banana',
          'peanut buter',
          'milk',
          'vanilla',
        ],
        options: [
          { size: '300ml', price: 9, default: true },
          { size: '500ml', price: 12 },
        ],
        fruit: true,
        vege: false,
        pressedJuice: false,
        milk: true,
      },
      {
        id: '5',
        name: 'orange pressed juice',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        image: '/images/5.jpeg',
        ingredients: [
          'orange',
          'carrot',
          'apple',
        ],
        options: [
          { size: '300ml', price: 7, default: true },
          { size: '500ml', price: 10 },
        ],
        fruit: true,
        vege: true,
        pressedJuice: true,
        milk: false,
      },
      {
        id: '6',
        name: 'milk pink smoothie',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        image: '/images/6.jpeg',
        ingredients: [
          'strawberry',
          'milk',
          'vanilla',
        ],
        options: [
          { size: '300ml', price: 9, default: true },
          { size: '500ml', price: 12 },
        ],
        fruit: true,
        vege: false,
        pressedJuice: false,
        milk: true,
      },
      {
        id: '7',
        name: 'milk aloe smoothie',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        image: '/images/7.jpeg',
        ingredients: [
          'watermelon',
          'strawberry',
          'aloes',
          'milk',
        ],
        options: [
          { size: '300ml', price: 9, default: true },
          { size: '500ml', price: 12 },
        ],
        fruit: true,
        vege: false,
        pressedJuice: false,
        milk: true,
      },
      {
        id: '8',
        name: 'hot pink pressed juice',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        image: '/images/8.jpeg',
        ingredients: [
          'dragon fruit',
          'beetroot',
          'blueberry',
          'coconut water',
        ],
        options: [
          { size: '300ml', price: 7, default: true },
          { size: '500ml', price: 10 },
        ],
        fruit: true,
        vege: true,
        pressedJuice: true,
        milk: false,
      },
      {
        id: '9',
        name: 'purple pressed juice',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        image: '/images/9.jpeg',
        ingredients: [
          'beetroot',
          'apple',
          'cucumber',
        ],
        options: [
          { size: '300ml', price: 7, default: true },
          { size: '500ml', price: 10 },
        ],
        fruit: false,
        vege: true,
        pressedJuice: true,
        milk: false,
      },
      {
        id: '10',
        name: 'milk white smoothie',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        image: '/images/10.jpeg',
        ingredients: [
          'banana',
          'melon',
          'milk',
          'ginger',
        ],
        options: [
          { size: '300ml', price: 9, default: true },
          { size: '500ml', price: 12 },
        ],
        fruit: true,
        vege: false,
        pressedJuice: false,
        milk: true,
      },
    ],*/
    oneProduct: undefined,
    loading: {
      active: false,
      error: false,
    },
  },
  cart: {
    items: [],
  },
  orders: {
    data: [],
    personalData,
    loading: {
      active: false,
      error: false,
    },
  },
  validation: {
    orderForm,
  },
};
