import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../utils/tetrominos';
import { STAGE_WIDTH } from '../utils/gameHelpers';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  // const updatePlayerPos = ( { x, y, collided }) // can also destructure like this.

  const updatePlayerPos = (event) => {
    const { x, y, collided } = event;

    setPlayer((prevState) => ({
      ...prevState,
      pos: { x: (prevState.pos.x += x), y: (prevState.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer];
};
