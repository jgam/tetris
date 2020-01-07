import { useState, useEffect } from 'react'; //useEffect is cycle method
import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage()); //setStage creates default stage
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = newStage =>
      newStage.reduce((ack, row) => {
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          //finding a cell with value 0 is false(-1) then it should be swept away.
          setRowsCleared(prev => prev + 1); //remove the one
          ack.unshift(new Array(newStage[0].length).fill([0, 'clear'])); //let us add new values to the array(after deleting 3 rows, we need to add 3 more rows on top)
          return ack;
        }
        //if there is somethin
        ack.push(row); //if we have the full row, we just add it in ack
        return ack;
      }, []);

    const updateStage = prevStage => {
      //First copy the stage
      const newStage = prevStage.map(
        row => row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)) //in here, if the cell is already marked with other tetrimonios, then leave it as it is.
      );

      //Then draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            //here if value is not 0, then color it with tetrimonios
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`
            ];
          }
        });
      });
      //then check if we collided
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }
      return newStage;
    };

    setStage(prev => updateStage(prev));
  }, [player]); //here use effect is somewhat blurry?
  //[player] is dependency array which is a standard of to use this effect hook when values regarding "player" is changed

  return [stage, setStage, rowsCleared];
};
