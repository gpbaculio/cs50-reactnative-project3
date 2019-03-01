import { reactotronRedux } from 'reactotron-redux';
import Reactotron from 'reactotron-react-native';

const reactotron = Reactotron.configure({
  port: 9090,
  name: 'CS50M Final Project'
})
  .use(reactotronRedux())
  .connect();

export default reactotron;
