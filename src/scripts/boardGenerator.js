(function () {

    window.GENERATOR = function () {

        function generateBoard() {
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

        return {
            generateBoard: generateBoard
        }
    };

})();