import { Stack, Typography } from '@mui/material';

import companyImage from '../../assets/images/company2-1000x1000-1-1.jpg';
import AuthorizationBar from 'components/AuthorizationBar';
import Loader from 'components/common/Loader';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const InitialScreen = () => {
    const [initiating, setInitiating] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return initiating ? (
        <Loader />
    ) : (
        <>
            <AuthorizationBar />
            <Stack
                alignItems="center"
                direction="row"
                gap="50px"
                justifyContent="center"
                pt={15}
                sx={{ flex: '1 1 auto', margin: '30px', overflow: 'hidden' }}
            >
                <Stack sx={{ height: '100%' }}>
                    <img
                        alt="companyImage"
                        src={companyImage}
                        style={{
                            objectFit: 'contain',
                            maxHeight: '100%',
                            position: 'relative',
                            top: '50%',
                            borderRadius: '100%',
                        }}
                    />
                </Stack>
                <Stack flexWrap="wrap" gap="20px" justifyContent="center" sx={{ flex: '1 1 55%', textAlign: 'left', padding: '0 5%' }}>
                    <Typography color="#3c4043" fontWeight="700" variant="h4">
                        Convenient Erotas BOILERPLATE
                    </Typography>
                </Stack>
            </Stack>
        </>
    );
};

export default InitialScreen;
