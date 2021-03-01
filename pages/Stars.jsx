import React, { useEffect, useState } from 'react';
import Star from './Star';
import styles from './stars.module.css';

export default function Stars() {
    let zoneRef = React.createRef();
    let zoneBottom;

    // Таймер
    let [time, setTime] = useState(0);
    function timer() {
        time = time + 1;
        setTime(time);
        let timeOut = setTimeout(timer, 1000);
    }
    useEffect(() => {
        zoneBottom = zoneRef.current.getBoundingClientRect().bottom;
    }, []);

    // Кнопки
    let [flag, setFlag] = useState(false);
    let [started, setStarted] = useState(false);
    let [paused, setPaused] = useState(false);

    let buttonsFuncs = (letter) => {
        switch (letter) {
            case 's': {
                starsProduction();
                timer();
                setStarted(true);
                setFlag(true);
                break;
            };
            case 'p': {
                setPaused(true);
                break;
            };
            case 'c': {
                setStarted(true);
                setPaused(false);
                break;
            };
            case 'r': {
                window.location.reload();
            };
        }
    }

    // Суммирование
    let [summ, setSumm] = useState(0);
    let summCounter = 0;
    let summa = 0;
    let setNewSumm = (value) => {
        summCounter++;
        summa = summa + value;
        if (summCounter > 2) {
            setSumm(summa);
            summCounter = 0;
        }
    }

    // Определение позиции
    let randomPosNums = [0, 0, 0];
    let randomPos = () => {
        let returnedValue = inferNum();
        function inferNum() {
            let a = Math.floor(Math.random() * 1000 - Math.random() * 10 * Math.random());
            if (a > 700 | a < 0) {
                return inferNum();
            } else {
                let sl = randomPosNums.slice(-3);
                for (let i = 0; i < sl.length; i++) {
                    if (sl[i] > a && a + 150 >= sl[i] || a > sl[i] && a - 150 <= sl[i] || a === sl[i]) {
                        return inferNum();
                    }
                }
                randomPosNums.push(a);
                return a
            }
        }
        return returnedValue;
    }
    let randomY = () => {
        let returnedValue = inferY();
        function inferY() {
            let a = Math.floor(Math.random() * 100);
            if (a > 100) {
                return inferY();
            } else {
                return a;
            }
        }
        return returnedValue;
    }

    // Звёзды
    let triple = 0;
    function changeTriple() {
        triple++;
        if (triple > 2) {
            triple = 0;
            let starsTimeout = setTimeout(() => starsProduction(), 10);
        }
    }

    let starsAr = [];
    let [starsCo, setStarsCo] = useState([]);
    let id = 0;

    function starsProduction() {
        id = 0;
        starsAr = [];
        setStarsCo([]);
        threeNums();
        threeNums();
        threeNums();
        function threeNums() {
            let range = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
            let randomNum = Math.floor(Math.random() * 10);
            let num = range[randomNum];
            starsAr.push(num);
            setStarsCo(starsAr.map(i => <Star changeTriple={changeTriple} starsProduction={starsProduction} setNewSumm={setNewSumm} zoneBottom={zoneBottom} posX={randomPos()} posY={randomY()} key={id = id + 1} value={i} />));
        }
    }

    // Return
    return (
        <div className={styles.section}>
            <div className={styles.header}>
                <div className={styles.header_leftSide}>
                    {
                        paused ?
                            <button className={styles.button} onClick={() => buttonsFuncs('c')}>Продолжить</button>
                            :
                            <button disabled={started} className={styles.button} onClick={() => buttonsFuncs('s')}>Запуск</button>
                    }
                    <button disabled={!started | paused} className={styles.button} onClick={() => buttonsFuncs('p')}>Пауза</button>
                    <button disabled={!flag} className={styles.button} onClick={() => buttonsFuncs('r')}>Рестарт</button>
                </div>
                <div className={styles.header_rightSide}>
                    <div className={styles.counter}>Timer: {time}</div>
                    <div className={styles.summ}>Current summ = {summ}</div>
                </div>
            </div>
            <div ref={zoneRef} className={styles.zone}>
                {starsCo}
            </div>
        </div>
    )
}