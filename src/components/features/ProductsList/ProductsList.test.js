import React from 'react';
import { shallow } from 'enzyme';
import { ProductsListComponent } from './ProductsList';

describe('Component ProductsList', () => {
  it('should render without crashing', () => {
    const component = shallow(<ProductsListComponent />);
    expect(component).toBeTruthy();
  });
});
