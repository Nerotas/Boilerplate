import { Box } from '@mui/material';
import React from 'react';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    [key: string]: any;
}

export function CustomTabPanel(props: TabPanelProps) {
    const { children, index, value, ...other } = props;

    return (
        <div aria-labelledby={`simple-tab-${index}`} hidden={value !== index} id={`simple-tabpanel-${index}`} role="tabpanel" {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}
export function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
