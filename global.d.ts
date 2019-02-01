declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module '*.css'
declare module '*.scss'

declare var __BROWSER__: boolean
declare var __BUILD__: boolean
declare var __DEV__: boolean
declare var __SIT__: boolean
declare var __UAT__: boolean
declare var __PROD__: boolean

declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any
  INITIAL_STATE: any
}

declare interface IActionPayload {
  type: string,
  payload: any
}

declare interface NodeModule {
  hot: any
}