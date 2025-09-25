import { Container } from 'pixi.js';
import { Sprite, BitmapText } from 'pixi.js';
import { SpriteManager } from '../../app/SpriteManger';

export const AnswerOptionsData: { [key: string]: string[] } = {
    question_1: [
        'It was first played with only one suit',
        'It\'s a game designed to be played alone',
        'The inventor\'s cat was named Solitaire'
    ],
    question_2: [
        '4',
        '2',
        '6'
    ],
    question_3: [
        'You win',
        'You lose',
        'Nothing — Jokers aren\'t in the deck'
    ]
};

// Correct answers by question number (1-based)
export const CorrectAnswers = {
    1: 1, // index 1: option b
    2: 0, // index 0: option a
    3: 2  // index 2: option c
};

class AnswerItem extends Container {
    private bg: Sprite;
    private label: BitmapText;
    private index: number;

    constructor(text: string, index: number) {
        super();
        this.index = index;
        this.bg = SpriteManager.createSprite('btn_idle_1');
        this.label = new BitmapText(text, { fontName: 'Mikado', fontSize: 24, align: 'center' });
        this.label.anchor.set(0.5, 0.5);
        this.bg.anchor?.set?.(0.5, 0.5);
        this.addChild(this.bg, this.label);
    }
}

export class AnswerOptions extends Container {
    private answerItems: AnswerItem[] = [];
    private counter: number;

    constructor(counter: number) {
        super();
        this.counter = counter;
        for (let i = 0; i < 3; i++) {
            const answers = AnswerOptionsData[`question_${this.counter}`];
            console.log('answers', answers);
            const answerText = answers[i];
            const answerItem = new AnswerItem(answerText, i);
            this.answerItems.push(answerItem);
        }
        const spacing = 10;
        let totalHeight = 0;
        for (let i = 0; i < this.answerItems.length; i++) {
            totalHeight += this.answerItems[i].height;
        }
        totalHeight += spacing * (this.answerItems.length - 1);

        let currentY = -totalHeight / 2;
        for (let i = 0; i < this.answerItems.length; i++) {
            const item = this.answerItems[i];
            item.position.set(0, currentY + item.height / 2);
            currentY += item.height + spacing;
        }
        this.addChild(...this.answerItems);
    }
}