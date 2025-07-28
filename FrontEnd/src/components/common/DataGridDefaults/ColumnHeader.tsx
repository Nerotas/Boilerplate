import { Typography, Box } from '@mui/material';
import { v4 } from 'uuid';
interface IColumnHeader {
    columnName: string;
}
const ColumnHeader = ({ columnName }: IColumnHeader) => (
    <Box data-testid="dataGridHeader" sx={{ p: 1, lineHeight: '15px', whiteSpace: 'normal', align: 'start', valign: 'flex-start' }}>
        <Typography fontWeight="Bold" key={v4()}>
            {columnName}
        </Typography>
    </Box>
);

export const LargeColumnHeader = ({ columnName }: IColumnHeader) => (
    <Box data-testid="dataGridHeader" sx={{ p: 1.2, whiteSpace: 'normal', align: 'start', valign: 'flex-start' }}>
        <Typography fontSize="0.75rem" fontWeight="Bold" key={v4()} sx={{ lineHeight: '20px' }}>
            {columnName}
        </Typography>
    </Box>
);

export const SmallColumnHeader = ({ columnName }: IColumnHeader) => (
    <Box data-testid="dataGridHeader" sx={{ lineHeight: '10px', whiteSpace: 'normal', align: 'start', valign: 'flex-start' }}>
        <Typography fontWeight="Bold" key={v4()} sx={{ fontSize: '0.8rem' }}>
            {columnName}
        </Typography>
    </Box>
);

export default ColumnHeader;
