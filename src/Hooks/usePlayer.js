import { useCallback, useState } from 'react';
import { STAGE_WIDTH } from '../utils/gameHelpers';

import { randomTetromino } from '../utils/tetrominos';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: randomTetromino().shape,
    colided: false,
  });

  const updatePlayerPos = (event) => {
    const { x, y, collided } = event;

    setPlayer((prevState) => ({
      ...prevState,
      pos: { x: (prevState.pos.x += x), y: (prevState.pos.y += y) },
      collided,
    }));
  };

  // useCallback to avoid an infinite loop
  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape(),
      collided: false,
    });
  }, []);
  return [player, updatePlayerPos, resetPlayer];
};
