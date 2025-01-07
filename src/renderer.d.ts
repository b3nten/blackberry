export type ToArray = <T>(value: T | T[]) => T[]

export interface VirtualNode {
  tag: string
  props?: Record<string, any>
  children: VirtualNode[]
}

export interface VirtualTextNode {
  value: string
}

export type HArgs = [string, Record<string, any>, VirtualNode[]]
