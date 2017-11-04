export class Player {

    positionX = 0;
    positionY = 0;

    getPosition(): object {
        return {
            X: this.positionX,
            Y: this.positionY
        }
    }

    setPosition(x: number, y: number): void {
        this.positionX = x;
        this.positionY = y;
    }
}
