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
    private isChecked: boolean = false;
    private questionCounter: number;
    private onAnswerSelected: (selectedIndex: number) => void;
    private onShowCorrectAnswer: () => void;

    constructor(text: string, index: number, questionCounter: number, onAnswerSelected: (selectedIndex: number) => void, onShowCorrectAnswer: () => void) {
        super();
        this.index = index;
        this.questionCounter = questionCounter;
        this.onAnswerSelected = onAnswerSelected;
        this.onShowCorrectAnswer = onShowCorrectAnswer;
        this.bg = SpriteManager.createSprite('btn_idle_1');
        this.label = new BitmapText(text, { fontName: 'Mikado', fontSize: 24, align: 'center' });
        this.label.anchor.set(0.5, 0.5);
        this.bg.anchor?.set?.(0.5, 0.5);
        this.addChild(this.bg, this.label);
        
        // Make it interactive
        this.interactive = true;
        this.buttonMode = true;
        this.cursor = 'pointer';
        
        // Add click handler
        this.on('pointerdown', this.onClick.bind(this));
    }

    private onClick(): void {
        if (this.isChecked) return; // Prevent multiple clicks
        
        this.isChecked = true;
        this.onAnswerSelected(this.index);
        this.check();
    }

    public disable(): void {
        this.interactive = false;
        this.buttonMode = false;
        this.cursor = 'default';
    }

    public showCorrectAnswer(): void {
        this.bg.texture = SpriteManager.getTexture('btn_correct');
    }

    private check(): void {
        this.bg.texture = SpriteManager.getTexture('btn_check');
        
        setTimeout(() => {
            const correctAnswerIndex = CorrectAnswers[this.questionCounter as keyof typeof CorrectAnswers];
            const isCorrect = this.index === correctAnswerIndex;
            
            if (isCorrect) {
                this.bg.texture = SpriteManager.getTexture('btn_correct');
            } else {
                this.bg.texture = SpriteManager.getTexture('btn_fail');
                // Show correct answer after 1 second if wrong answer was chosen
                setTimeout(() => {
                    this.onShowCorrectAnswer();
                }, 1000);
            }
        }, 500);
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
            const answerItem = new AnswerItem(answerText, i, this.counter, this.onAnswerSelected.bind(this), this.showCorrectAnswer.bind(this));
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

    private onAnswerSelected(selectedIndex: number): void {
        // Disable all other answer items
        this.answerItems.forEach((item, index) => {
            if (index !== selectedIndex) {
                item.disable();
            }
        });
    }

    private showCorrectAnswer(): void {
        const correctAnswerIndex = CorrectAnswers[this.counter as keyof typeof CorrectAnswers];
        // Find the correct answer item and change its background to btn_correct
        this.answerItems.forEach((item, index) => {
            if (index === correctAnswerIndex) {
                // Use a small delay to ensure the wrong answer has been shown first
                setTimeout(() => {
                    item.showCorrectAnswer();
                }, 100);
            }
        });
    }
}