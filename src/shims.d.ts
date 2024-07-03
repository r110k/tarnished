import * as React from 'react'

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    flex?: boolean
    relative?: boolean
    grid?: boolean
    shadow?: boolean
    text?: string 
    before?: string 
    after?: string 
    bg?: string
    w?: string
    h?: string
    style?: string
  }
}