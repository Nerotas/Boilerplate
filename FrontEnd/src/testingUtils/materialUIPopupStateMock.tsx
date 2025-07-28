import React from 'react';
import mockCustomTestComponent from './CustomTestComponent';

export const mockClosePopupFn = jest.fn();

jest.mock('material-ui-popup-state', () => {
    const originalLib = jest.requireActual('material-ui-popup-state');
    const React = jest.requireActual('react');
    const CustomComponent = mockCustomTestComponent;
    const PopupState = ({ children, popupId, ...rest }: { children: any; popupId: string; [key: string]: any }) => (
        <>
            <CustomComponent data-testid={`material-ui-popup-state-${popupId}`} {...rest}>
                {children({ close: mockClosePopupFn })}
            </CustomComponent>
        </>
    );

    return {
        __esModule: true,
        ...originalLib,
        bindMenu: () => ({ bindMenuProp: 'testBindMenu' }),
        bindTrigger: () => ({ bindTrigger: 'testBindTrigger' }),
        default: onpopstate,
    };
});
