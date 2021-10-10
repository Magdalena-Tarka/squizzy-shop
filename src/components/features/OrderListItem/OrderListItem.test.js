import React from 'react';
import { shallow } from 'enzyme';
import { OrderListItemComponent } from './OrderListItem';

describe('Component OrderListItem', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderListItemComponent />);
    expect(component).toBeTruthy();
  });
});
