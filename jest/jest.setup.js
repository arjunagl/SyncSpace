import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// setup file
configure({ adapter: new Adapter() });

// global.requestAnimationFrame = function (callback) {
//     setTimeout(callback, 0);
// };
