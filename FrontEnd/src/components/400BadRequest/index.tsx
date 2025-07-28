import './badrequest.module.scss';

import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function BadRequest() {
    const navigate = useNavigate();
    const backToHome = () => {
        navigate('/');
    };

    return (
        <div
            data-testid="400BadRequest"
            style={{ backgroundColor: '#fff', padding: '20px 10px 220px 30px', margin: '51px 0 100px -30px', height: '61vh' }}
        >
            <h1
                style={{
                    top: '100px',
                    textAlign: 'center',
                    fontSize: '250px',
                    textSizeAdjust: '100%',
                    fontFamily: 'proxima-nova',
                    color: '#1D1D1F',
                }}
            >
                400
            </h1>
            <p
                style={{
                    textAlign: 'center',
                    fontSize: '65px',
                    textSizeAdjust: '100%',
                    color: '#1D1D1F',
                }}
            >
                Bad Request
            </p>
            <Button id="backHomeButton" onClick={backToHome}>
                GO TO HOME
            </Button>
        </div>
    );
}

export default BadRequest;
