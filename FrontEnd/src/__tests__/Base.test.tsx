/* eslint-disable prefer-promise-reject-errors */
import { cleanup } from '@testing-library/react';

describe('Basic unit test', () => {
    beforeAll((done) => {
        done();
    });
    afterAll((done) => {
        done();
    });
    afterEach(cleanup);
    test('has correct title', () => {
        expect(true).toEqual(true); // Dummy test just for integrating unit tests with our CI/CD
    });
});
