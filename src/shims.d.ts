import * as React from 'react'

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    flex?: boolean
    grid?: boolean
    block?: boolean
    fixed?: boolean
    relative?: boolean
    absolute?: boolean
    truncate?: boolean
    shadow?: boolean
    'focus:shadow'?: boolean
    w?: string
    h?: string
    b?: string
    z?: string
    bg?: string
    to?: string
    from?: string
    top?: string
    right?: string
    bottom?: string
    left?: string
    rounded?: string
    text?: string
    before?: string
    after?: string
  }
  interface SVGProps<T> extends SVGAttributes<T>, ClassAttributes<T> {
    w?: string
    h?: string
  }
}