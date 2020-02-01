/*
 * Handy JSON clone util. See https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
 */
export function deepClone(json) {
  return JSON.parse(JSON.stringify(json));
}

/*
 * Very simple class implementation for a fixture store.
 * The data is cloned on the way in. You should instantiate a
 * new instance for each test. It's important to do this for
 * imported fixtures, to avoid side effects to other tests.
 *
 * Fixtures retrieved are the original clones (we do not clone
 * again upon retrieval via getFixture). Thus you can retrieve
 * a fixture from the instance, modify it and those modifications
 * will be maintained for your current test.
 */
export class FixtureFactory {
  /*
   * Instantiate this with an object mapping keys to fixtures.
   * The keys can be used to retrieve the cloned fixtures
   * using getFixture.
   */
  constructor(fixtures = {}) {
    this.fixtures = {};
    this.addFixtures(fixtures);
  }

  /*
   * Add fixtures to the library. The fixtures are cloned upon
   * addition.
   */
  addFixtures(fixtures) {
    this.fixtures = { ...this.fixtures, ...deepClone(fixtures) };
  }

  /*
   * Retrieve a fixture by key. Throws an error if the fixture is
   * undefined (indicating a bad test).
   */
  getFixture(fixtureType) {
    const fixture = this.fixtures[fixtureType];

    if (!fixture) {
      throw new Error(`No fixture ${fixtureType} has been defined`);
    }

    return fixture;
  }
}

/* Replaces Date.now with a function that returns a provided
 * date.
 * @param {Date} now | The date to mock
 * @returns The Date.now() output for the mock.
 */
export function mockDateNow(now) {
  Date.now = jest.spyOn(Date, 'now').mockImplementation(() => now.getTime());
  return Date.now();
}
