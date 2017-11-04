import {GameManager} from "./GameManager";
import {InMemoryLevelGenerator} from "./level/InMemoryLevelGenerator";
import {LevelElements} from "./level/LevelElements";
import {GameSettings} from "./settings/GameSettings";

let levelGenerator = new InMemoryLevelGenerator();
let levelElements = new LevelElements();
let gameSettings = new GameSettings();

let gameManager = new GameManager(
    levelGenerator,
    levelElements,
    gameSettings
);
gameManager.startGame();
