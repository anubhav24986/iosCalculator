export interface IButtonConfig {
    content: string
    type?: string
}
//button configuration
export const ButtonConfig: IButtonConfig[] = [
    { content: '±', type: 'function' },
    { content: '%', type: 'function' },
    { content: '÷', type: 'operator' },
    { content: '7' },
    { content: '8' },
    { content: '9' },
    { content: '*', type: 'operator' },
    { content: '4' },
    { content: '5' },
    { content: '6' },
    { content: '-', type: 'operator' },
    { content: '1' },
    { content: '2' },
    { content: '3' },
    { content: '+', type: 'operator' },
    { content: '0' },
    { content: '.' },
    { content: '=', type: 'operator' },
]
