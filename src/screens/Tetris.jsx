import { useState } from 'react';
// components
import Stage from '../components/Stage';
import Display from '../components/Display';
import StartButton from '../components/StartButton';

// utils
import { createStage } from '../utils/gameHelpers';

// Styled Components
import { StyledTetris, StyledTetrisWrapper } from '../styles/tetris.styles';

//  Custom Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

export default function Tetris() {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log('re-render');

  const movePlayer = (dir) => {
    updatePlayerPos({ x: dir, y: 0 });
  };

  const startGame = () => {
    // reset everything
    setStage(createStage());
    resetPlayer();
  };

  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false });
  };

  const dropPlayer = () => {
    drop();
  };

  const move = (event) => {
    const { keyCode } = event;

    if (!gameOver) {
      if (!keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      }
    }
  };

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)}>
      <StyledTetris>
        <Stage stage={createStage()} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton onClick={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
}
