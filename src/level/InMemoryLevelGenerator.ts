export class InMemoryLevelGenerator {

    private base = [];
    private row = [];

    public generateLevel(): Array<Array<string>> {
        return this.createLevel();
    }

    private createLevel(): Array<Array<string>> {
        this.prepareBase(11, 11);

        return this.base;
    }

    private prepareBase(x: number, y: number): void {
        this.base = [];
        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {
                if (this.isFirstRow(i)) {
                    this.row.push('WW');
                    continue;
                }

                if (this.isLastRow(i, x - 1)) {
                    this.row.push('WW');
                    continue;
                }

                this.fillMiddleRows(i, j, x, y);
            }
            this.base.push(this.row);
            this.row = [];
        }

        console.log(this.base);
    }

    private fillMiddleRows(i, j, x, y): void {
        // first vertical line
        if (i !== 0 && j === 0 && i !== x - 1) {
            this.row.push('WW');
            return;
        }

        // last vertical line
        if (i !== 0 && i !== x - 1 && j === y - 1) {
            this.row.push('WW');
            return;
        }

        if (!(j % 2) && !(i % 2)) {
            this.row.push('WW');
        } else {
            this.row.push('OO');
        }
    }

    private isFirstRow(index: number): boolean {
        return index === 0;
    }

    private isLastRow(index: number, levelSize: number): boolean {
        return index === levelSize;
    }

    private getHardcodedLevel(): Array<Array<string>> {
        return [
            ['WW', 'SS', 'WW', 'WW', 'WW', 'WW', 'WW'],
            ['WW', '00', '00', 'WW', '00', '00', '!!'],
            ['WW', '00', '00', 'WW', '00', 'WW', 'WW'],
            ['WW', '00', 'WW', 'WW', '00', 'WW', 'WW'],
            ['WW', '00', 'WW', '00', '00', '00', 'WW'],
            ['WW', '00', 'WW', '00', 'WW', '00', 'WW'],
            ['WW', '00', '00', '00', '00', '00', 'WW'],
            ['WW', 'WW', 'WW', 'WW', 'WW', 'WW', 'WW']
        ];
    }
}
