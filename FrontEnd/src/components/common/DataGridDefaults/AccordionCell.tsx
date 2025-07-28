import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { size } from 'lodash';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

interface IAccordingCell {
    row: string;
    selected: boolean;
}

const AccordionCell = ({ row, selected = false }: IAccordingCell) => {
    const [expanded, setExpanded] = useState<boolean>(false);

    const handleChange = () => {
        setExpanded(!expanded);
    };

    return size(row) > 200 ? (
        <Accordion className={selected ? 'columnBlue' : ''} disableGutters elevation={0} expanded={expanded} onChange={handleChange}>
            <AccordionSummary aria-controls="accordionCell-content" expandIcon={<ExpandMoreIcon />} id="accordionCell-header">
                {expanded ? row : `${row.substring(0, 200)}...`}
            </AccordionSummary>
        </Accordion>
    ) : (
        <AccordionDetails>{row}</AccordionDetails>
    );
};

export default AccordionCell;
