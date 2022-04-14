import { shallow } from 'enzyme';
import { InfoBoxesComponent } from './InfoBoxes';

describe('Component InfoBoxes', () => {
  it('should render without crashing', () => {
    const component = shallow(<InfoBoxesComponent />);
    expect(component).toBeTruthy();
  });
});
