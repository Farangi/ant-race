import { animated } from "react-spring";
import "./index.css";
interface Props {
    styles: any
}
/**
 * Animated Ant Component
 * @param styles
 * @returns React.FC
 */
const AnimatedAnt:React.FC<Props> = ({ styles }) => {
    return (
        <div>
            <div className="ant-wrapper">
                <animated.div className="ant-back" style={{...styles}}></animated.div>
                <animated.div className="ant-mid" style={{...styles}}></animated.div>
                <animated.div className="ant-head" style={{...styles}}></animated.div>
            </div>
        </div>
    );
};
export default AnimatedAnt