import * as React from 'react'

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    truncate?: boolean
    flex?: boolean
    relative?: boolean
    absolute?: boolean
    grid?: boolean
    shadow?: boolean
    fixed?: boolean
    block?: boolean
    'focus:shadow'?: boolean
    text?: string
    before?: string
    after?: string
    bg?: string
    w?: string
    h?: string
    rounded?: string
    b?: string
    z?: string
    top?: string
  }
  interface SVGProps<T> extends SVGAttributes<T>, ClassAttributes<T> {
    w?: string
    h?: string
  }
}