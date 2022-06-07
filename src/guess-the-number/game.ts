export class Game {
    RANDOM_NUMBER: number;

    private SCOPE = [0, 100];

    private guesses: number[] = [];

    private complete = false;

    private message = '';

    constructor() {
        this.RANDOM_NUMBER = 27;
    }

    guessNumber(number: number): void {
        if (this.isGameOver()) {
            throw new Error('Game is over! You can not make new guesses.');
        }

        if (this.isGuessCorrect(number)) {
            this.message = 'Congratulations, you won!';
            this.complete = true;
        } else if (this.numberAlreadyGuessed(number)) {
            this.message = 'Haha! You already guessed this number.';
        } else if (this.isOutOfScope(number)) {
            this.message = 'Sorry! Your guess is out of scope (0-100).';
        } else if (this.guessTooHigh(number)) {
            this.message = 'Sorry! Your guess is too high.';
        } else if (this.guessTooLow(number)) {
            this.message = 'Sorry! Your guess is too low.';
        }

        this.guesses.push(number);

        if (this.isGameOver()) {
            this.complete = true;
            this.message = 'You lost! You have no more attempts left.';
        }
    }

    isComplete(): boolean {
        return this.complete;
    }

    getMessage(): string {
        return this.message;
    }

    restart(): void {
        this.complete = false;
        this.guesses = [];
        this.message = '';
    }

    private isOutOfScope(number: number): boolean {
        return number > this.SCOPE[1] || number < this.SCOPE[0];
    }

    private numberAlreadyGuessed(number: number): boolean {
        return this.guesses.includes(number);
    }

    private isGameOver(): boolean {
        return this.guesses.length === 10;
    }

    private guessTooLow(number: number): boolean {
        return number < this.RANDOM_NUMBER;
    }

    private guessTooHigh(number: number): boolean {
        return number > this.RANDOM_NUMBER;
    }

    private isGuessCorrect(number: number): boolean {
        return number === this.RANDOM_NUMBER;
    }
}
