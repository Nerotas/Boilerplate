jest.mock('react-helmet-async', () => {
    const React = require('react');
    const MockHelmet = ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) =>
        React.createElement(
            'div',
            {
                ...props,
                className: 'mock-helmet',
            },
            children
        );
    return { Helmet: MockHelmet };
});

export {};
