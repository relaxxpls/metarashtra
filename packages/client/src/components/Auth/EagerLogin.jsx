import { useEagerConnect } from '../../hooks';
import { LoadingAnimation } from '../shared';

const EagerLogin = ({ children }) => {
  // ? handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEagerConnect = useEagerConnect();

  // ? handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  // useInactiveListener(!triedEagerConnect || !!activatingConnector);

  if (!triedEagerConnect) return <LoadingAnimation fixed />;

  return children;
};

export default EagerLogin;
