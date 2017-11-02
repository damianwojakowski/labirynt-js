export class LevelGenerator {

    public generateLevel(): Array<Array<string>> {
        return [
            ['WW', 'WW', 'WW', 'WW', 'WW', 'WW', 'WW'],
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
