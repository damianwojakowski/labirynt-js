import {GameManager} from "./GameManager";
import {InMemoryLevelGenerator} from "./level/InMemoryLevelGenerator";
import {LevelElements} from "./level/LevelElements";
import {GameSettings} from "./settings/GameSettings";
import {Player} from "./Player";

let player = new Player();
player.setInitialPosition(2, 2);

let gameManager = new GameManager(
    new InMemoryLevelGenerator(),
    new LevelElements(),
    new GameSettings(),
    player
);

gameManager.startGame();
