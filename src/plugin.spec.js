import plugin from './plugin'; // eslint-disable-line no-unused-vars

describe('plugin', () => {
    test('should log', () => {
        global.log = jest.fn();

        global.run();

        expect(log.mock.calls.length).toBe(1);
        expect(log.mock.calls[0][0]).toBe('Here my am!');
    });
});
