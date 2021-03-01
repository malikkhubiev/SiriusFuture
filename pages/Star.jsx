import React, { useEffect } from 'react';
import styles from './stars.module.css';

export default function Star (props) {
    let myRef = React.createRef();
    useEffect(()=>{
        let element = myRef.current; 

        let checkPosition = () => {
            let bottomStar = element.getBoundingClientRect().bottom;
            let bottomZone = props.zoneBottom;
            if(bottomStar >= bottomZone+100){
                clearInterval(checkPositionInterval);
                props.setNewSumm(props.value);
                props.changeTriple();
            }
        }

        let checkPositionInterval = setInterval(checkPosition, 500);
        
        element.classList.add('falling');
        element.style.left = `${props.posX}px`;
        element.style.top = `${props.posY}px`;
    }, []);

    return <div ref={myRef} className={styles.star}>{props.value}</div>
}