import {GameManager} from "./GameManager";
import {InMemoryLevelGenerator} from "./level/InMemoryLevelGenerator";
import {LevelElements} from "./level/LevelElements";
import {GameSettings} from "./settings/GameSettings";
import {Player} from "./Player";

let gameManager = new GameManager(
    new InMemoryLevelGenerator(),
    new LevelElements(),
    new GameSettings(),
    new Player()
);

gameManager.startGame();
