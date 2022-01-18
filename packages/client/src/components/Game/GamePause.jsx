import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import { gameState } from '../../recoil/atoms';
import Button from '../shared/Button';
import { PageCard } from '../shared/Page';

const GamePause = ({ socket }) => {
  const router = useRouter();
  const [status, setStatus] = useRecoilState(gameState);

  const handleRejoin = () => {
    socket.open();
    setStatus((_status) => ({ ..._status, isDisconnected: false }));
  };

  const handleContinue = () => {
    setStatus({ ...status, isPaused: false });
    if (socket?.connected) socket.emit('continue');
  };

  const handleExit = () => {
    if (socket?.connected) socket.emit('exit');
    router.push('/');
  };

  return (
    <PageCard style={{ position: 'absolute' }}>
      {status.loading ? (
        <Spin style={{ display: 'flex' }} />
      ) : (
        <>
          {status.isDisconnected ? (
            <Button type="primary" onClick={handleRejoin}>
              Rejoin
            </Button>
          ) : (
            <Button type="primary" onClick={handleContinue}>
              Continue
            </Button>
          )}

          <Button>Settings</Button>

          <Button type="primary" danger onClick={handleExit}>
            Exit
          </Button>
        </>
      )}
    </PageCard>
  );
};

export default GamePause;
