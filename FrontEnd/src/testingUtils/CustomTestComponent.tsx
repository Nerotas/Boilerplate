import React, { ReactNode } from 'react';

interface MockCustomTestComponentProps {
    children?: ReactNode;
    [key: string]: any;
}

const mockCustomTestComponent = (props: MockCustomTestComponentProps): JSX.Element => {
    const { children, ...rest } = props;

    return <div {...rest}>{children}</div>;
};

export default mockCustomTestComponent;
