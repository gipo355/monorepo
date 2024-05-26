import { sayHelloCross } from './say-hello-cross';

describe('sayHelloCross', () => {
  it('should work', () => {
    expect(sayHelloCross()).toEqual('say-hello-cross');
  });
});
