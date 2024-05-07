export default class Game {
    // private canvas: HTMLCanvasElement;
    // private ctx: CanvasRenderingContext2D;
    private height: number = window.innerHeight;
    private width: number = window.innerWidth;

    constructor() {
        // this.canvas = <HTMLCanvasElement>document.getElementById('game-canvas');
        // this.ctx = this.canvas.getContext("2d");
    }

    public render(): void {
        // // Set font properties
        // this.ctx.font = '30px Arial';
        // this.ctx.fillStyle = 'white'; // Text color

        // // Text to render
        // const text = 'Hello, World!';

        // // Calculate text width
        // const textWidth = this.ctx.measureText(text).width;

        // // Calculate text position at the center of the canvas
        // const x = (this.width - textWidth) / 2;
        // const y = this.height / 2;

        // // Render text on the canvas
        // this.ctx.fillText(text, x, y);
    }
}

