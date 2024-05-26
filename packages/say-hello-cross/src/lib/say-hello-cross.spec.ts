import { sayHelloCross } from './say-hello-cross';

describe('sayHelloCross', () => {
  it('should work', () => {
    expect(
      sayHelloCross({
        output: 'say-hello-cross',
      })
    ).toEqual('say-hello-cross');
  });
});
