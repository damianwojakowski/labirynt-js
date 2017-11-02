import {LevelGenerator} from "./level/LevelGenerator";

export function startGame() {
    console.log('game loaded');

    let generator = new LevelGenerator();

    let SETTINGS = {
        GRID_SIZE: 30,
        GAME_ID: 'game',
        SIZE: 600
    };

    let ELEMENTS = {
        WALL: 'WW',
        FREE_SPACE: '00',
        END_POINT: '!!'
    };

    let board = generator.generateLevel();

    let PLAYER_POSITION = {X: 2, Y: 2};

    // loop this after click or push key events
    let CONTEXT_2D = initializeBoardAndReturnContext2d();

    function getContext2d() {
        return CONTEXT_2D;
    }

    play();

    function initializeBoardAndReturnContext2d() {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById(SETTINGS.GAME_ID);
        canvas.width = SETTINGS.SIZE; //horizontal resolution (?) - increase for better looking text
        canvas.height = SETTINGS.SIZE; //vertical resolution (?) - increase for better looking text
        canvas.style.width = String(SETTINGS.SIZE); //actual width of canvas
        canvas.style.height = String(SETTINGS.SIZE); //actual height of canvas

        return canvas.getContext("2d");
    }

    function play() {
        let context2d: CanvasRenderingContext2D = getContext2d();

        drawBoard(context2d);
        drawPlayer(context2d);
    }

    function drawBoard(context2d: CanvasRenderingContext2D) {
        drawElements(context2d);
    }

    function drawElements(context2d: CanvasRenderingContext2D) {
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

    let KEY_CODES = {
        ARROW_UP: 38,
        ARROW_DOWN: 40,
        ARROW_LEFT: 37,
        ARROW_RIGHT: 39
    };

    function drawPlayer(context2d: CanvasRenderingContext2D) {
        context2d.beginPath();
        context2d.arc((PLAYER_POSITION.X + 1) * SETTINGS.GRID_SIZE, (PLAYER_POSITION.Y + 1) * SETTINGS.GRID_SIZE, SETTINGS.GRID_SIZE / 2, 0, 2 * Math.PI);
        context2d.fillStyle = 'pink';
        context2d.fill();
    }

    document.addEventListener('keydown', movePlayer);

    function movePlayer(event: KeyboardEvent ) {

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
            setTimeout(showWinPage, 0);
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

    function canMoveTo(newPositionY: any, newPositionX: any) {
        return board[newPositionY][newPositionX] === ELEMENTS.FREE_SPACE ||
            board[newPositionY][newPositionX] === ELEMENTS.END_POINT;

    }

}
