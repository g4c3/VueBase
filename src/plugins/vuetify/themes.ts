import { ThemeDefinition } from 'vuetify'

const lightTheme: typeof ThemeDefinition = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#6200EE',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC6',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    }
}

// const darkTheme = new ThemeDefinition({
//     dark: true,
//     colors: {
//         primary: '#2196F3',
//         secondary: '#424242',
//         accent: '#FF4081',
//         error: '#FF5252',
//         info: '#2196F3',
//         success: '#4CAF50',
//         warning: '#FB8C00',
//     }
// })


export { lightTheme }