import { Game } from '../game';

let game: Game;
const setupGame = (): void => {
    game = new Game();
    game.RANDOM_NUMBER = 27;
};

const guessMultipleTimes = (howMany: number): void => {
    for (let i = 0; i < howMany; i += 1) {
        game.guessNumber(i);
    }
};

describe('game', () => {
    beforeEach(setupGame);

    it('congratulates player if game won on first try', () => {
        game.guessNumber(27);

        expect(game.isComplete()).toBe(true);
        expect(game.getMessage()).toBe('Congratulations, you won!');
    });

    it('notifies player if guess is too high', () => {
        game.guessNumber(50);

        expect(game.getMessage()).toBe('Sorry! Your guess is too high.');
    });

    it('notifies player if guess is too low', () => {
        game.guessNumber(5);

        expect(game.getMessage()).toBe('Sorry! Your guess is too low.');
    });

    it('notifies player if guess is out of scope', () => {
        game.guessNumber(105);

        expect(game.getMessage()).toBe('Sorry! Your guess is out of scope (0-100).');
    });

    it('laughs at player for duplicated guesses', () => {
        game.guessNumber(10);
        game.guessNumber(10);

        expect(game.getMessage()).toBe('Haha! You already guessed this number.');
    });

    it('notifies player when the game is lost', () => {
        guessMultipleTimes(9);
        expect(game.isComplete()).toBe(false);

        game.guessNumber(10);
        expect(game.isComplete()).toBe(true);
        expect(game.getMessage()).toBe('You lost! You have no more attempts left.');
    });

    it('prevents player from guessing any more numbers when game is complete', () => {
        guessMultipleTimes(10);
        expect(game.isComplete()).toBe(true);

        expect(() => {
            game.guessNumber(99);
        }).toThrowError('Game is over! You can not make new guesses.');
    });

    it('restarts the game', () => {
        guessMultipleTimes(10);
        expect(game.isComplete()).toBe(true);

        game.restart();

        expect(game.isComplete()).toBe(false);
        expect(game.getMessage()).toBe('');
    });
});
