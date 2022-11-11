//this function is used for calculate font size if display length greator then 8
export const calculateFont = (displayDiv: HTMLElement): number => {
    const displayValue = displayDiv.innerHTML;
    let fontSize = 10;

    if (displayValue.length >= 8 && displayValue.length < 9) {
        fontSize = fontSize - 1;
    }
    if (displayValue.length >= 9 && displayValue.length < 10) {
        fontSize = fontSize - 2;
    }
    if (displayValue.length >= 10) {
        fontSize = fontSize - 3;
    }
    // displayDiv.style.fontSize = fontSize +"vh";
    return fontSize;
}
//This function is used to add comma in display value
export const formatValue = (value: string): any => {
    if (value === '0' || value==='Error') return value;
    let output = '';
    let decimal = '';
    let isNeg = false;
    value = value.toString();
    if (value.includes('.')) {
        output = value.substring(0, value.indexOf('.'));
        decimal = value.substring(value.indexOf('.'));
    } else {
        output = value;
    }
    if (parseFloat(value) < 0) {
        isNeg = true;
        output = output.substring(1);
    }

    return isNeg
        ? '-' + parseFloat(output).toLocaleString() + decimal
        : parseFloat(output).toLocaleString() + decimal;
}
