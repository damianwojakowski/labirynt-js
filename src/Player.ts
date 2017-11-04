export class Player {

    positionX = 0;
    positionY = 0;

    getPositionY(): number {
        return this.positionY;
    }

    getPositionX(): number {
        return this.positionX;
    }

    setPositionX(x: number): void {
        this.positionX = x;
    }

    setPositionY(y: number): void {
        this.positionY = y;
    }

    setInitialPosition(x: number, y: number): void {
        this.positionX = x;
        this.positionY = y;
    }
}
