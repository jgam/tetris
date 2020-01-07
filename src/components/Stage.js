import React from 'react';
import { StyledStage } from './styles/StyledStage';

import Cell from './Cell';

//this takes in array of array and each element in the array is a cell
//at the end for each cell, it returns <Cell /> component, with thed key and type to
//demonstrate whether it had been collided or not.
const Stage = ({ stage }) => (
  <StyledStage width={stage[0].length} height={stage.length}>
    {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
  </StyledStage>
);

export default Stage;
