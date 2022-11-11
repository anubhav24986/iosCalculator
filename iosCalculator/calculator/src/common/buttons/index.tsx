import React from "react";
//Button Component created after using button config
export interface IButton {
    content: string,
    type?: string,
    onButtonClick: Function
}
const Button = ({ content, onButtonClick, type }: IButton): React.ReactElement => {

    return <div data-testid={`button${content}`} onClick={() => { onButtonClick(content) }} className={`Button ${content === "0" ? "zero" : ""} ${type || ""}`}>{content}</div>

}
export default Button;