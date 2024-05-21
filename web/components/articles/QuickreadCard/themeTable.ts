
export type ThemePalette = {
  background: string,
  border: string,
  icon: 'light' | 'dark',
  text: string
}

const black: ThemePalette = Object.freeze({
  background: '#1a1919',
  border: '#f8dbd5',
  icon: 'light',
  text: '#ffffff'
})

const bronze: ThemePalette = Object.freeze({
  background: '#bf8a75',
  border: '#f8dbd5',
  icon: 'light',
  text: '#ffffff'
})

const darkBlue: ThemePalette = Object.freeze({
  background: '#5f747a',
  border: '#f8dbd5',
  icon: 'light',
  text: '#ffffff'
})

const darkBrown: ThemePalette = Object.freeze({
  background: '#7c7868',
  border: '#f8dbd5',
  icon: 'light',
  text: '#ffffff'
})

const darkGray: ThemePalette = Object.freeze({
  background: '#636466',
  border: '#f8dbd5',
  icon: 'light',
  text: '#fafafa'
})

const darkGreen: ThemePalette = Object.freeze({
  background: '#728678',
  border: '#f8dbd5',
  icon: 'light',
  text: '#ffffff'
})

const darkPink: ThemePalette = Object.freeze({
  background: '#99716d',
  border: '#f8dbd5',
  icon: 'light',
  text: '#ffffff'
})


const darkPurple: ThemePalette = Object.freeze({
  background: '#6c5f6d',
  border:'#f8dbd5',
  icon:'light',
  text:'#ffffff'
})


const lightBlue: ThemePalette = Object.freeze({
  background:'#cadddf',
  border: '#6c816f',
  icon: 'dark',
  text: '#1a1919'
})


const lightGray: ThemePalette = Object.freeze({
  background:'#e6e7e8',
  border:'#99716d',
  icon: 'dark',
  text: '#2c453b'
})


const lightGreen: ThemePalette = Object.freeze({
  background: '#d2e3d7',
  border: '#6c5f6d',
  icon: 'dark',
  text: '#2c453b'
})

const lightPink: ThemePalette = Object.freeze({
  background: '#f8dbd5',
  border: '#6c816f',
  icon: 'dark',
  text: '#2c453b'
})

const lightPurple: ThemePalette = Object.freeze({
  background: '#d7cad8',
  border: '#6c816f',
  icon: 'dark',
  text: '#2c453b'
})

const lightYellow: ThemePalette = Object.freeze({
  background: '#f7f4df',
  border: '#6c816f',
  icon: 'dark',
  text: '#2c453b'
})

const mediumGray: ThemePalette = Object.freeze({
  background: '#939497',
  border: '#f8dbd5',
  icon: 'light',
  text: '#fafafa'
})

const white: ThemePalette = Object.freeze({
  background: '#fafafa',
  border: '#99716d',
  icon: 'dark',
  text: '#2c453b'
})


export const themeTable = {
  '--black': black,
  '--bronze': bronze,
  '--dark-blue': darkBlue,
  '--dark-brown': darkBrown,
  '--dark-gray': darkGray,
  '--dark-green': darkGreen,
  '--dark-pink': darkPink,
  '--dark-purple': darkPurple,
  '--default': lightBlue,
  '--light-blue': lightBlue,
  '--light-gray': lightGray,
  '--light-green': lightGreen,
  '--light-pink': lightPink,
  '--light-purple': lightPurple,
  '--light-yellow': lightYellow,
  '--medium-gray': mediumGray,
  '--white': white
}

export const iconTable = {
  dark: '/brandicons/sh_sunglasses_sage.png',
  light: '/brandicons/sh_sunglasses_white.png',
}
