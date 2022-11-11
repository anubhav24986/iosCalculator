import React, { useRef, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { runInAction } from 'mobx';
import { UseStore } from './../store';
import Button from '../common/buttons';
import { useTheme } from '../themes';
import { ButtonConfig, IButtonConfig } from './../config/buttonConfig';
import { calculateFont, formatValue } from '../utils';
import Loader from '../common/loader';
//Calculator Component which is a observer for Mobx
const Calculator: React.FC = () => {
    const [value, setValue] = useState('0');
    const [lastValue, setLastValue] = useState('0');
    const [displayReset, setDisplayStart] = useState(true);
    const [operator, setOperator] = useState('');
    const { calStore } = UseStore();
    const displayObj = useRef<HTMLInputElement>(null);

    const [isCalculating, setCalculating] = useState(false);

    const resetCalculator = (): any => {
        setLastValue('0');
        setOperator('');
        cleanCalculator();
    }
    const cleanCalculator = (): any => {
        runInAction(() => {
            calStore.value = '0';
        })
        setValue('0');
        setDisplayStart(true);
    }

    const setValuesAfterResult = (): any => {
      
        setLastValue(calStore.value);
        setCalculating(false);
        setValue('0');
        
    }

    const numberClick = (content: string): any => {
        const currentNum = value;
        if (displayReset) {
            operator === '' &&
                calStore.value === '0' &&
                setLastValue(currentNum.toString());
            runInAction(() => {
                calStore.value = '0';
            })
            setValue(content.toString());
        } else {
            setValue((currentNum + content).toString())
        }
        setDisplayStart(false);
    }
    const operatorClick = (content: string): any => {
        
        let applyOperator = ''
        if (content === '+') {
            applyOperator = 'add';
        } else if (content === '-') {
            applyOperator = 'subtract';
        } else if (content === '*') {
            applyOperator = 'multiply';
        } else if (content === '÷') {
            applyOperator = 'divide';
        } else if (content === '%') {
            applyOperator = 'percent';
        }
        setDisplayStart(true);

        if (operator) {
            if(calStore.value!=="Error"){

            setCalculating(true);
                calStore.calculateResult(
                    parseFloat(lastValue),
                    operator,
                    parseFloat(value),
                    setValuesAfterResult
                )
            }
            else{
               setLastValue("0");
               setOperator('');
            }
            
        } else {
            setLastValue(parseFloat(value).toString());
        }
        value !== '0' && setOperator(applyOperator);
    }

    const handleButtonClick = (content: string): void => {
        if (content === 'AC' || content === 'C') {
            if (content === 'AC') {
                resetCalculator();
            } else {
                cleanCalculator();
            }
        } else if (
            content === '+' ||
            content === '-' ||
            content === '*' ||
            content === '÷' ||
            content === '%'
        ) {
            operatorClick(content);
        } else if (content === '±' || content === '=') {
            if (content === '±') {
                calStore.value = (parseFloat(calStore.value) * -1).toString();
                setValue((parseFloat(value) * -1).toString());
            } else if (content === '=') {
                if (operator) {
                    setCalculating(true);
                    calStore.calculateResult(
                        parseFloat(lastValue),
                        operator,
                        parseFloat(value),
                        setValuesAfterResult
                    );
                }
            }
        } else {
            numberClick(content);
        }
    }

    useEffect(() => {
        if (displayObj.current) {
            const fontSize: number = calculateFont(displayObj.current);
            displayObj.current.style.fontSize = fontSize + 'vh';
        }
    }, [calStore.value, value]);

    const theme = useTheme();

    return (
        <div className={`calculator ${theme}`}>
            <Loader visible={isCalculating}></Loader>
            <div
                ref={displayObj}
                data-testid="displayarea"
                className="display"
                style={{ fontSize: '10vh', height: 166 }}
            >
                {calStore.value !== '0'
                    ? formatValue(calStore.value)
                    : formatValue(value)}
            </div>
            <div className="buttons">
                <Button
                    onButtonClick={handleButtonClick}
                    content={value !== '0' ? 'C' : 'AC'}
                    type={'function'}
                ></Button>

                {ButtonConfig.map((config: IButtonConfig, index: number) => {
                    return (
                        <Button
                            key={`btn${index}`}
                            onButtonClick={handleButtonClick}
                            {...config}
                        ></Button>
                    )
                })}
            </div>
        </div>
    )
}
export default observer(Calculator)
