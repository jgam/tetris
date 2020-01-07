import {useState, useEffect} from 'react';//useEffect is cycle method
import {createStage} from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());//setStage creates default stage

    useEffect(() => {
        const updateStage = prevStage => {
            //First copy the stage
            const newStage = prevStage.map(row =>
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),//in here, if the cell is already marked with other tetrimonios, then leave it as it is.
            );

            //Then draw the tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if(value !== 0){//here if value is not 0, then color it with tetrimonios
                        newStage[y + player.pos.y][x+player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,
                        ]
                    }
                })
            })
            //then check if we collided
            if(player.collided){
                resetPlayer();
            }
            return newStage;
        };

        setStage(prev => updateStage(prev));

    }, [player]);//here use effect is somewhat blurry?
    //[player] is dependency array which is a standard of to use this effect hook when values regarding "player" is changed

    return [stage, setStage];
}