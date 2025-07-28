import store from '../store';
import { setNavbarTitle } from '../navbarTitle/actions';

describe('Navbar Title Actions and Reducers', () => {
    beforeEach(() => {
        (store.dispatch as any)(setNavbarTitle());
    });

    it('should set the navbar title', () => {
        (store.dispatch as any as any)(setNavbarTitle('Test Title'));
        expect(store.getState().navbarTitle.title).toBe('|  Test Title');
    });

    it('should clear the navbar title', () => {
        (store.dispatch as any as any)(setNavbarTitle('Test Title'));
        (store.dispatch as any)(setNavbarTitle(''));
        expect(store.getState().navbarTitle.title).toBe('|  ');
    });
});
