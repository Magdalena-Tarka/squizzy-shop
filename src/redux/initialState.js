export const initialState = {
  products: {
    data: [
      {
        id: '1',
        name: 'name 1',
        price: 9,
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        image: '/images/1.jpeg',
        params: {
          size: {
            label: 'size',
            options: {
              small: { label: '300ml', price: 0, default: true },
              big: { label: '500ml', price: 3 },
            },
          },
        },
        fruit: false,
        vege: true,
        pressedJuice: false,
        milk: false,
      },
      {
        id: '2',
        name: 'name 2',
        price: 9,
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        image: '/images/2.jpeg',
        params: {
          size: {
            label: 'size',
            options: {
              small: { label: '300ml', price: 0, default: true },
              big: { label: '500ml', price: 3 },
            },
          },
        },
        fruit: true,
        vege: true,
        pressedJuice: true,
        milk: false,
      },
      {
        id: '3',
        name: 'name 3',
        price: 9,
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        image: '/images/3.jpeg',
        params: {
          size: {
            label: 'size',
            options: {
              small: { label: '300ml', price: 0, default: true },
              big: { label: '500ml', price: 3 },
            },
          },
        },
        fruit: true,
        vege: false,
        pressedJuice: false,
        milk: true,
      },
      {
        id: '4',
        name: 'name 4',
        price: 9,
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        image: '/images/4.jpeg',
        params: {
          size: {
            label: 'size',
            options: {
              small: { label: '300ml', price: 0, default: true },
              big: { label: '500ml', price: 3 },
            },
          },
        },
        fruit: true,
        vege: false,
        pressedJuice: false,
        milk: true,
      },
      {
        id: '5',
        name: 'name 5',
        price: 9,
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        image: '/images/5.jpeg',
        params: {
          size: {
            label: 'size',
            options: {
              small: { label: '300ml', price: 0, default: true },
              big: { label: '500ml', price: 3 },
            },
          },
        },
        fruit: true,
        vege: true,
        pressedJuice: true,
        milk: false,
      },
      {
        id: '6',
        name: 'name 6',
        price: 9,
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        image: '/images/6.jpeg',
        params: {
          size: {
            label: 'size',
            options: {
              small: { label: '300ml', price: 0, default: true },
              big: { label: '500ml', price: 3 },
            },
          },
        },
        fruit: true,
        vege: false,
        pressedJuice: false,
        milk: true,
      },
      {
        id: '7',
        name: 'name 7',
        price: 9,
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        image: '/images/7.jpeg',
        params: {
          size: {
            label: 'size',
            options: {
              small: { label: '300ml', price: 0, default: true },
              big: { label: '500ml', price: 3 },
            },
          },
        },
        fruit: true,
        vege: false,
        pressedJuice: false,
        milk: true,
      },
      {
        id: '8',
        name: 'name 8',
        price: 9,
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        image: '/images/8.jpeg',
        params: {
          size: {
            label: 'size',
            options: {
              small: { label: '300ml', price: 0, default: true },
              big: { label: '500ml', price: 3 },
            },
          },
        },
        fruit: true,
        vege: true,
        pressedJuice: true,
        milk: false,
      },
      {
        id: '9',
        name: 'name 9',
        price: 9,
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        image: '/images/9.jpeg',
        params: {
          size: {
            label: 'size',
            options: {
              small: { label: '300ml', price: 0, default: true },
              big: { label: '500ml', price: 3 },
            },
          },
        },
        fruit: false,
        vege: true,
        pressedJuice: true,
        milk: false,
      },
      {
        id: '10',
        name: 'name 10',
        price: 9,
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        image: '/images/10.jpeg',
        params: {
          size: {
            label: 'size',
            options: {
              small: { label: '300ml', price: 0, default: true },
              big: { label: '500ml', price: 3 },
            },
          },
        },
        fruit: true,
        vege: false,
        pressedJuice: false,
        milk: true,
      },
    ],
    loading: {
      active: false,
      error: false,
    },
  },
};
