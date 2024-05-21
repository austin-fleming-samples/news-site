import 'styled-components'
import { Borders as BordersProps } from './borders'
import { Breakpoints as BreakpointsProps } from './breakpoints'
import { Fonts as FontsProps } from './Fonts'
import { Palette as PaletteProps } from './palette'
import { Layout as LayoutProps } from './layout'
import { Transitions as TransitionsProps } from './transitions'
import { Typography as TypographyProps } from './typography'
import { ZIndex as ZIndexProps } from './zindex'
import { theme } from './theme'

type ThemeProps = typeof theme
declare module 'styled-components' {
    export interface DefaultTheme extends ThemeProps {
        borders: BordersProps,
        breakpoints: BreakpointsProps,
        fonts: FontsProps,
        palette: PaletteProps,
        layout: LayoutProps,
        transitions: TransitionsProps,
        typography: TypographyProps,
        zIndex: ZIndexProps,
        colors?: any
    }
}