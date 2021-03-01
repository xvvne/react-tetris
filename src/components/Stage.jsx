import { StyledStage } from '../styles/stage.styles';
import Cell from './Cell';

const Stage = ({ stage }) => (
  <StyledStage width={stage[0].length} height={stage.length}>
    {/* stage holds rows. */}
    {stage.map((row) =>
      // row holds the cells, so we map through the row and get the cells.
      row.map((cell, idx) => <Cell key={idx} type={cell[0]} />)
    )}
  </StyledStage>
);

export default Stage;
