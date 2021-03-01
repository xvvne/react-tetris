import Cell from './Cell';

const Stage = ({ stage }) => (
  <div>
    {/* stage holds rows. */}
    {stage.map((row) =>
      // row holds the cells, so we map through the row and get the cells.
      row.map((cell, idx) => <Cell key={idx} type={cell[0]} />)
    )}
  </div>
);

export default Stage;
