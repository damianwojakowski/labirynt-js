(function () {
    console.log('game loaded');

    var SETTINGS = {
        GRID_SIZE: 60,
        GAME_ID: 'game',
        SIZE: 600
    };

    var ELEMENTS = {
        WALL: 'WW',
        FREE_SPACE: '00',
        END_POINT: '!!'
    };

    var COLOURS = {

    };

    var board = [
        ['WW', 'WW', 'WW', 'WW', '!!', 'WW'],
        ['WW', '00', '00', 'WW', '00', 'WW'],
        ['WW', '00', '00', 'WW', '00', 'WW'],
        ['WW', '00', 'WW', 'WW', '00', 'WW'],
        ['WW', '00', '00', '00', '00', 'WW'],
        ['WW', 'WW', 'WW', 'WW', 'WW', 'WW']
    ];

    var PLAYER_POSITION = {X: 2, Y: 2};

    // loop this after click or push key events
    var CONTEXT_2D = initializeBoardAndReturnContext2d();

    function getContext2d() {
        return CONTEXT_2D;
    }

    play();

    function initializeBoardAndReturnContext2d() {
        var canvas = document.getElementById(SETTINGS.GAME_ID);
        canvas.width=SETTINGS.SIZE;//horizontal resolution (?) - increase for better looking text
        canvas.height=SETTINGS.SIZE;//vertical resolution (?) - increase for better looking text
        canvas.style.width=SETTINGS.SIZE;//actual width of canvas
        canvas.style.height=SETTINGS.SIZE;//actual height of canvas

        return canvas.getContext("2d");
    }

    function play() {
        var context2d = getContext2d();

        drawBoard(context2d);
        drawPlayer(context2d);
    }

    function drawBoard(context2d) {
        drawElements(context2d);
    }

    function drawElements(context2d) {
        board.forEach(function (elements, indexY) {
            elements.forEach(function (element, indexX) {
                context2d.beginPath();
                context2d.arc((indexX + 1) * SETTINGS.GRID_SIZE, (indexY + 1) * SETTINGS.GRID_SIZE, SETTINGS.GRID_SIZE / 2, 0, 2 * Math.PI);
                if (element === ELEMENTS.WALL) {
                    context2d.fillStyle = 'black';
                } else if (element === ELEMENTS.END_POINT) {
                    context2d.fillStyle = 'blue';
                } else {
                    context2d.fillStyle = 'white';
                }
                context2d.fill();
            });
        });
    }

    var KEY_CODES = {
        ARROW_UP: 38,
        ARROW_DOWN: 40,
        ARROW_LEFT: 37,
        ARROW_RIGHT: 39
    };

    function drawPlayer(context2d) {
        context2d.beginPath();
        context2d.arc((PLAYER_POSITION.X + 1) * SETTINGS.GRID_SIZE, (PLAYER_POSITION.Y + 1) * SETTINGS.GRID_SIZE, SETTINGS.GRID_SIZE / 2, 0, 2 * Math.PI);
        context2d.fillStyle = 'pink';
        context2d.fill();
    }

    document.addEventListener('keydown', movePlayer);

    function movePlayer(event) {

        if (event.keyCode === KEY_CODES.ARROW_UP) {
            tryToMoveUp();
        } else if (event.keyCode === KEY_CODES.ARROW_DOWN) {
            tryToMoveDown();
        } else if (event.keyCode === KEY_CODES.ARROW_LEFT) {
            tryToMoveLeft();
        } else if (event.keyCode === KEY_CODES.ARROW_RIGHT) {
            tryToMoveRight();
        }

        play();

        if (didWin()) {
            showWinPage();
        }

    }

    function didWin() {
        return board[PLAYER_POSITION.Y][PLAYER_POSITION.X] === ELEMENTS.END_POINT
    }

    function showWinPage() {
        alert("YOU FOUND THE EXIT!");
    }

    function tryToMoveUp() {
        if (canMoveTo(PLAYER_POSITION.Y - 1, PLAYER_POSITION.X)) {
            PLAYER_POSITION.Y--;
        }
    }

    function tryToMoveDown() {
        if (canMoveTo(PLAYER_POSITION.Y + 1, PLAYER_POSITION.X)) {
            PLAYER_POSITION.Y++;
        }
    }

    function tryToMoveLeft() {
        if (canMoveTo(PLAYER_POSITION.Y, PLAYER_POSITION.X - 1)) {
            PLAYER_POSITION.X--;
        }
    }

    function tryToMoveRight() {
        if (canMoveTo(PLAYER_POSITION.Y, PLAYER_POSITION.X + 1)) {
            PLAYER_POSITION.X++;
        }
    }

    function canMoveTo(newPositionY, newPositionX) {
        return board[newPositionY][newPositionX] === ELEMENTS.FREE_SPACE ||
            board[newPositionY][newPositionX] === ELEMENTS.END_POINT;

    }

})();
