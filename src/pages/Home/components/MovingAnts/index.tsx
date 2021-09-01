import React from 'react'
import { useSpring, animated, useSprings } from 'react-spring'
import { Ant } from '../../../../_services/ant.service'
import startSvg from "../../../../assets/start.svg";
import finishSvg from "../../../../assets/finish.svg";
import AnimatedAnt from './AnimatedAnt';

interface PROPS {
    ants: Ant[]
}


/**
 * Moving Ants Component
 * @param ants 
 * @returns React.FC
 */
const MovingAnts: React.FC<PROPS> = ({ ants }) => {

    /**
     * Springs for Ant animations
     */
    const springs = useSprings(
        ants.length,
        ants.map(item => ({
            loop: true,
            to: { x: window.innerWidth - 100 },
            from: { x: 0, backgroundColor: item.color },
            config: { duration: (item.weight * 200) / (item.length / 200) },
        }))
    )
    return (
        <div className="flex flex-row justify-between mt-40 relative">
            <img width={100} className="mt-14" src={startSvg} />
            {
                springs.map((styles, i) => (
                    <div style={{
                        position: 'absolute',
                        left: 0,
                        top: 60 + (i * 20),
                    }}><AnimatedAnt styles={styles} /></div>
                )
                )
            }
            <img width={100} className="mt-14" src={finishSvg} />
        </div>
    )
}

export default MovingAnts
