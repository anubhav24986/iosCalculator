import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
    render,
    cleanup,
    getByTestId,
    fireEvent,
    waitFor,
} from '@testing-library/react'
import Renderer from 'react-test-renderer'

import Button from './common/buttons'

import '@testing-library/jest-dom/extend-expect'

import App from './app'

cleanup()
it('if render correctly', () => {
    const { getByTestId } = render(
        <Button content="7" onButtonClick={() => {}}></Button>
    )
    expect(getByTestId('button7')).toHaveTextContent('7');
})
cleanup()
it('if render correctly', () => {
    const { getByTestId } = render(
        <Button content="8" onButtonClick={() => {}}></Button>
    )
    expect(getByTestId('button8')).toHaveTextContent('8');
})
it('matches snapshot ', () => {
    const domTree = Renderer.create(
        <Button content="8" onButtonClick={() => {}}></Button>
    ).toJSON()
    expect(domTree).toMatchSnapshot();
})
// Here we use only multiply but we can use any operator and test the value
it('btn clicks and calculation work', async () => {
    const { container } = render(<App />);
    const countValue = getByTestId(container, 'displayarea');
    const btn3 = getByTestId(container, 'button3');
    const btnmultiply = getByTestId(container, 'button*');
    const btn5 = getByTestId(container, 'button5');

    const btnEqual = getByTestId(container, 'button=');

    expect(countValue.textContent).toBe('0');
    fireEvent.click(btn3);
    expect(countValue.textContent).toBe('3');
    fireEvent.click(btnmultiply);
    // expect(countValue.textContent).toBe("3");
    fireEvent.click(btn5);
    fireEvent.click(btnEqual);
    //default it will for 50 milisecond
    await waitFor(() => {
        expect(countValue.textContent).toBe('15');
    })
})
