/* istanbul ignore file */
import { Box } from '@mui/material';
import copy from 'copy-to-clipboard';
import { useEffect, useState } from 'react';

export const VersionInfo = () => {
    const portalVersion = process.env.REACT_APP_APP_VERSION as string;
    const dockerImage = process.env.REACT_APP_DOCKER_IMAGE as string;
    const portalVersionShort = portalVersion.substring(0, 7);

    const [justCopied, setJustCopied] = useState(false);

    useEffect(() => {
        console.log(`%c Console portal version: "${portalVersion}"`, 'background: #fcf7f8; color: #ed3366;');
    }, []);

    const onClick = () => {
        copy(JSON.stringify({ portalVersion, dockerImage }));
        setJustCopied(true);
        setTimeout(() => setJustCopied(false), 300);
    };

    const [show, setShow] = useState(false);

    const handleKey = ({ altKey, code, ctrlKey, shiftKey }: KeyboardEvent) => {
        const anyMeta = altKey || shiftKey || ctrlKey;
        if (anyMeta && code === 'KeyV') {
            setShow((value) => !value);
        }
    };

    useEffect(() => {
        if (typeof document === 'undefined') return;
        document.addEventListener('keypress', handleKey);
        return () => {
            if (typeof document === 'undefined') return;
            document.removeEventListener('keypress', handleKey);
        };
    }, []);

    return (
        <Box
            onClick={onClick}
            sx={{
                position: 'fixed',
                right: 0,
                bottom: 0,
                opacity: justCopied || show ? 1 : 0.09,
                textShadow: '1px 1px white',
                cursor: 'context-menu',
                fontSize: '.7rem',
                color: 'black',
                zIndex: 9_999_999,
                transition: '.2s all ease-in-out',
                pr: 1,
                ':hover': {
                    opacity: 1,
                },
            }}
        >
            {justCopied ? (
                'Copied'
            ) : (
                <span style={{ fontFamily: '"Courier New", Courier, monospace' }}>
                    <Box display="inline" mr={2}>
                        App version: {portalVersionShort}
                    </Box>
                </span>
            )}
        </Box>
    );
};
