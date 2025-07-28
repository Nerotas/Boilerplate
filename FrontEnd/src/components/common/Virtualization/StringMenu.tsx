import { ListSubheader, Typography } from '@mui/material';
import React from 'react';
import { ListChildComponentProps, VariableSizeList } from 'react-window';

const LISTBOX_PADDING = 8; // px

function renderRow({ data, index, style }: ListChildComponentProps) {
    const dataSet = data[index];
    const option: string = dataSet[1];

    const inlineStyle = {
        ...style,
        top: style.top as number,
        width: '75%',
    };
    if (dataSet.hasOwnProperty('group')) {
        return (
            <ListSubheader component="div" key={dataSet.key} style={inlineStyle}>
                {dataSet.group}
            </ListSubheader>
        );
    }

    const { key, ...optionProps } = dataSet[0];
    return (
        <Typography component="li" key={key} {...optionProps} noWrap px={2} style={inlineStyle}>
            {option}
        </Typography>
    );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
    const ref = React.useRef<VariableSizeList>(null);
    React.useEffect(() => {
        if (ref.current != null) {
            ref.current.resetAfterIndex(0, true);
        }
    }, [data]);
    return ref;
}

export const StringMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(function StringMenu(props, ref) {
    const { children, ...other } = props;
    const itemData: React.ReactElement<unknown>[] = [];
    (children as React.ReactElement<unknown>[]).forEach(
        (
            item: React.ReactElement<unknown> & {
                children?: React.ReactElement<unknown>[];
            }
        ) => {
            itemData.push(item);
            itemData.push(...(item.children || []));
        }
    );

    const itemCount = itemData.length;
    const itemSize = 48;

    const getChildSize = (child: React.ReactElement<unknown>) => {
        if (child.hasOwnProperty('group')) {
            return 48;
        }

        return itemSize;
    };

    const getHeight = () => {
        if (itemCount > 8) {
            return 8 * itemSize;
        }
        return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
        <div ref={ref}>
            <OuterElementContext.Provider value={other}>
                <VariableSizeList
                    height={getHeight() + 2 * LISTBOX_PADDING}
                    innerElementType="ul"
                    itemCount={itemCount}
                    itemData={itemData}
                    itemSize={(index) => getChildSize(itemData[index])}
                    outerElementType={OuterElementType}
                    overscanCount={5}
                    ref={gridRef}
                    width="100%"
                >
                    {renderRow}
                </VariableSizeList>
            </OuterElementContext.Provider>
        </div>
    );
});
