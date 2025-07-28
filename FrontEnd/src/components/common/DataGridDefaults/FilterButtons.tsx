import { Button, Tooltip } from '@mui/material';
import { GridApiPro } from '@mui/x-data-grid-pro';

import { useState } from 'react';

const ToggleDeprecatedButton = ({ apiRef }: { apiRef: React.MutableRefObject<GridApiPro> }) => {
    const [showDeprecated, setDeprecate] = useState<boolean>(false);

    const handleShowDeprecated = (apiRef: React.MutableRefObject<GridApiPro>) => {
        apiRef.current.deleteFilterItem({ field: 'deprecatedOnUtc', operator: 'isEmpty', id: 'deprecated' });
        apiRef.current.setColumnVisibilityModel({
            deprecatedOnUtc: true,
            deprecatedByEmail: true,
        });
        setDeprecate(true);
    };

    const handleHideDeprecated = (apiRef: React.MutableRefObject<GridApiPro>) => {
        apiRef.current.upsertFilterItem({ field: 'deprecatedOnUtc', operator: 'isEmpty', id: 'deprecated' });
        apiRef.current.setColumnVisibilityModel({
            deprecatedOnUtc: false,
            deprecatedByEmail: false,
        });
        setDeprecate(false);
    };

    return showDeprecated ? (
        <Tooltip title="Under construction. Deprecated rows can be enabled via the Columns menu.">
            <span>
                <Button onClick={() => handleHideDeprecated(apiRef)} variant="text">
                    Hide Deprecated
                </Button>
            </span>
        </Tooltip>
    ) : (
        <Tooltip title="Under construction. Deprecated rows can be enabled via the Columns menu.">
            <span>
                <Button onClick={() => handleShowDeprecated(apiRef)} variant="text">
                    Show Deprecated
                </Button>
            </span>
        </Tooltip>
    );
};

export default ToggleDeprecatedButton;
