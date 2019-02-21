import { reactotronRedux } from 'reactotron-redux';
import Reactotron from 'reactotron-react-native';

const reactotron = Reactotron.configure({
  port: 9090,
  name: 'React Native Demo'
})
  .use(reactotronRedux())
  .useReactNative()
  .connect();

export default reactotron;
