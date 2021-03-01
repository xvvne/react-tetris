import Stage from '../components/Stage';
import Display from '../components/Display';
import StartButton from '../components/StartButton';
import { createStage } from '../utils/gameHelpers';
import { StyledTetris, StyledTetrisWrapper } from '../styles/tetris.styles';

export default function Tetris() {
  return (
    <StyledTetrisWrapper>
      <StyledTetris>
        <Stage stage={createStage()} />
        <aside>
          <div>
            <Display text="Score" />
            <Display text="Rows" />
            <Display text="Level" />
          </div>
          <StartButton />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
}
