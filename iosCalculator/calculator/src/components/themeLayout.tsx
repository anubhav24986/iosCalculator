import React from 'react';
import { useThemeUpdate } from '../themes';
//We can create more themes here
const ThemeLayout: React.FC = () => {
    const changeTheme = useThemeUpdate('theme-orange');

    return (
        <div className={`themeOption`}>
            <div
                id="theme-orange"
                onClick={(): void => {
                    changeTheme('theme-orange');
                }}
            ></div>

            <div
                id="theme-green"
                onClick={(): void => {
                    changeTheme('theme-green');
                }}
            ></div>
        </div>
    )
}
export default ThemeLayout
