import {Container} from 'pixi.js';
import { Question } from './Question';
import { QuestionSprite } from './QuestionSprite';
import { AnswerOptions } from './AnswerOptions';


export class Quiz extends Container {
    private question: Question;
    private image: QuestionSprite;
    private answerOptions: AnswerOptions;
    private counter: number;

    constructor() {
        super();
        this.counter = 1;
        this.question = new Question(this.counter);
        this.image = new QuestionSprite(this.counter);
        this.answerOptions = new AnswerOptions(this.counter);
        this.addChild(
            this.question, 
            this.image, 
            this.answerOptions
        );
    }

    public setCounter(counter: number): void {
        this.counter = counter;
        this.question = new Question(this.counter);
        this.image = new QuestionSprite(this.counter);
        this.answerOptions = new AnswerOptions(this.counter);
    }

    public resize(): void {
        this.question.position.set(0, -240);
        this.image.position.set(0, -62);
        this.answerOptions.position.set(0, 181);
    }
}