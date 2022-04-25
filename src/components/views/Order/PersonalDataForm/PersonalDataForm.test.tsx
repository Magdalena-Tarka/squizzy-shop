import { shallow } from 'enzyme';
import { PersonalDataFormComponent } from './PersonalDataForm';
import { PersonalData } from '../../../../types';

const personalData = {} as PersonalData;
const updateOrderForm = {} as (field: string, value: string) => void;

describe('Component PersonalDataForm', () => {
  it('should render without crashing', () => {
    const component = shallow(<PersonalDataFormComponent personalData={personalData} updateOrderForm={updateOrderForm} />);
    expect(component).toBeTruthy();
  });
});
