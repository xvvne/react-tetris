import Stage from '../components/Stage';
import Display from '../components/Display';
import StartButton from '../components/StartButton';
import { createStage } from '../utils/gameHelpers';

export default function Tetris() {
  return (
    <div>
      <Stage stage={createStage()} />
      <aside>
        <div>
          <Display text="Score" />
          <Display text="Rows" />
          <Display text="Level" />
        </div>
        <StartButton />
      </aside>
    </div>
  );
}
