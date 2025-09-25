import { Container, Sprite } from 'pixi.js';
import { SpriteManager } from '../../app/SpriteManger';

export enum QuestionImageOptions {
    image1 = 'image_1',
    image2 = 'image_2',
    image3 = 'image_3'
}

function getImageTextureByCounter(counter: number): string {
    switch (counter) {
        case 1:
            return QuestionImageOptions.image1;
        case 2:
            return QuestionImageOptions.image2;
        case 3:
            return QuestionImageOptions.image3;
        default:
            return QuestionImageOptions.image1;
    }
}

export class QuestionSprite extends Container {

    private image: Sprite;
    private counter: number = 1;
    constructor(counter: number) {  
        super();
        this.counter = counter;
        this.image = SpriteManager.createSprite(getImageTextureByCounter(this.counter));
        this.addChild(this.image);
    }   
}