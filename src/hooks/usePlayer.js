import {useState, useCallback} from 'react';
import {TETROMINOS, randomTetromino} from '../tetrominos';
import {STAGE_WIDTH} from '../gameHelpers';

export const usePlayer = () => {
    //player update with setPlayer
    const [player, setPlayer] = useState({
        pos: { x:0, y:0},
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    //update player position
    const updatePlayerPos = ({x, y, collided}) => {
        setPlayer(prev => ({
            ...prev,//this operator lets overwrite properties to be changed
            pos: { x: (prev.pos.x += x), y:(prev.pos.y += y)},//consider prev positions position and get new position
            collided,
        })) 
    }

    //set the original axis
    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: {x: STAGE_WIDTH / 2 - 2, y: 0},
            tetromino: randomTetromino().shape,
            collided: false,
        })
    }, [])



    return [player, updatePlayerPos, resetPlayer];//returns player, position, reset position
}