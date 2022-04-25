import { shallow } from 'enzyme';
import { OrderListItemComponent } from './OrderListItem';

describe('Component OrderListItem', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderListItemComponent image={''} name={''} note={''} priceSingle={0} quantity={0} size={''} />);
    expect(component).toBeTruthy();
  });
});
