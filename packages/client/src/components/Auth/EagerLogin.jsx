import { useEagerConnect } from '../../hooks';
import { LoadingAnimation } from '../shared';

const EagerLogin = ({ children }) => {
  const triedToEagerConnect = useEagerConnect();
  if (!triedToEagerConnect) return <LoadingAnimation fixed />;

  return children;
};

export default EagerLogin;

// import { useEagerConnect, useInactiveListener } from "../../hooks";
// // ? handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
// const triedEager = useEagerConnect();
// // ? handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
// useInactiveListener(!triedEager || !!activatingConnector);
