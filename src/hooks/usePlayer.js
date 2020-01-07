import { useState, useCallback } from 'react';
import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH, checkCollision } from '../gameHelpers';

export const usePlayer = () => {
  //player update with setPlayer
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false
  });

  const rotate = (matrix, dir) => {
    //make the rows to become cols (transpose)
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map(col => col[index])
    ); //here actual transpose
    //Reverse each row to get a rotated matrix
    if (dir > 0) return rotatedTetro.map(row => row.reverse());
    return rotatedTetro.reverse();
  };

  const playerRotate = (stage, dir) => {
    //detect collision when rotating the player
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);
    //this will rotate the player

    const pos = clonedPlayer.pos.x;
    let offset = 1; //to check whether right or left move is possible. This is a magnitude
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      //check collision
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1)); //actual offset value with +1 and -1
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  //update player position
  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev, //this operator lets overwrite properties to be changed
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) }, //consider prev positions position and get new position
      collided
    }));
  };

  //set the original axis
  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate]; //returns player, position, reset position as a function so we can use them
};
