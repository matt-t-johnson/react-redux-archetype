import {
  FixtureFactory,
  deepClone,
} from './test-utils';

let fixtures;

describe('TestUtils', () => {
  beforeEach(() => {
    fixtures = {
      boo: {
        boo: 'boo',
      },
      hiss: {
        hiss: 'hiss',
      },
    };
  });

  describe('FixtureFactory', () => {
    it('performs as expected', () => {
      const factory = new FixtureFactory(fixtures);
      expect(factory).toBeTruthy();

      const boo = factory.getFixture('boo');
      // retrieved fixture is a clone of original
      expect(boo).not.toBe(fixtures.boo);

      // retrieved fixture is a proper clone of original
      expect(boo.boo).toEqual(fixtures.boo.boo);
      boo.boo = 'hiss';

      // original fixture was not modified
      expect(boo.boo).not.toEqual(fixtures.boo.boo);
    });
  });

  describe('deepClone', () => {
    it('performs as expected', () => {
      const clone = deepClone(fixtures);
      expect(clone).not.toBe(fixtures);
      expect(clone.boo.boo).toEqual(fixtures.boo.boo);
    });
  });
});
