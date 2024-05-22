import { sayHelloCross } from './say-hello-cross';

describe('sayHelloCross', () => {
  it('should work', () => {
    expect(
      sayHelloCross({
        output: 'example-node-lib',
      })
    ).toEqual('example-node-lib');
  });
});
