declare module '@vgrid/simpleheat' {
  export type Gradient = { [stop: number]: string }
  export type Point = [number, number, number]

  export default class SimpleHeat {
    constructor(canvas: string | HTMLCanvasElement)

    defaultRadius: number
    defaultGradient: Gradient

    _r: number

    data(data: Point[]): SimpleHeat
    max(max: number): SimpleHeat
    add(point: Point): SimpleHeat
    clear(): SimpleHeat
    radius(r: number, blur?: number): SimpleHeat
    resize(): void
    gradient(gradient: Gradient): SimpleHeat
    draw(minOpacity?: number): SimpleHeat
  }
}
