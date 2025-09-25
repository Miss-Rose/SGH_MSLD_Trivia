import { BitmapText, Container, Sprite } from 'pixi.js';
import { SpriteManager } from '../../app/SpriteManger';

export enum QuestionOptions {
    question1 = 'Why is the card game called\n"Solitaire"?',
    question2 = 'How many Jacks are in a standard\ndeck?',
    question3 = 'What happens if you draw a Joker\nin Solitaire?'
}

export class Question extends Container {
    private container: Container;
    private question: BitmapText;
    private counter: number = 1;
    private bg: Sprite;

    constructor(counter: number) {
        super();
        const initialQuestion = this.getQuestionByCounter();
        this.question = new BitmapText(initialQuestion, { fontName: 'Mikado', fontSize: 28, align: 'center'});
        this.question.anchor.set(0.5, 0.5);
        this.container = new Container();
        this.container.addChild(this.question);
        this.bg = SpriteManager.createSprite('question_text_placeholder');

        this.addChild(this.bg, this.question);
        this.counter = counter;
    }

    private getQuestionByCounter(): string {
        switch (this.counter) {
            case 1:
                return QuestionOptions.question1;
            case 2:
                return QuestionOptions.question2;
            case 3:
                return QuestionOptions.question3;
            default:
                return QuestionOptions.question1;
        }
    }

    public updateQuestionText(): void {
        const newQuestion = this.getQuestionByCounter();
        this.question.text = newQuestion;
    }
}