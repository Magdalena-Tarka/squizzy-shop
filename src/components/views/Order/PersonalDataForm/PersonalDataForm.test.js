import React from 'react';
import { shallow } from 'enzyme';
import { PersonalDataFormComponent } from './PersonalDataForm';

describe('Component PersonalDataForm', () => {
  it('should render without crashing', () => {
    const component = shallow(<PersonalDataFormComponent />);
    expect(component).toBeTruthy();
  });
});
