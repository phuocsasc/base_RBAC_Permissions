import { Alert, Box, Typography, CircularProgress, Divider, Button } from '@mui/material';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import authorizedAxiosInstance from '~/utils/authorizedAxios';
import { API_ROOT } from '~/utils/constants';
import { handleLogoutApi } from '~/apis';

function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const res = await authorizedAxiosInstance.get(`${API_ROOT}/v1/dashboards/access`);
            // const userInfoFormLocalstorage = localStorage.getItem('userInfo');
            // console.log('Data from Localstorage', JSON.parse(userInfoFormLocalstorage));

            setUser(res.data);
        };
        fetchData();
    }, []);
    // có thể có nhiểu useEffect ...

    const handleLogout = async () => {
        // Gọi API logout
        await handleLogoutApi();
        // Nếu trường hợp dùng cookie thì nhớ xóa userInfo trong localstorage
        // localStorage.removeItem('userInfo')

        // Cuối cùng là điều hướng tới trang Login sau khi Logout thành công
        navigate('/login');
    };

    if (!user) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    width: '100vw',
                    height: '100vh',
                }}
            >
                <CircularProgress />
                <Typography>Loading dashboard user...</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                maxWidth: '1120px',
                marginTop: '1em',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: '0 1em',
            }}
        >
            <Alert severity="info" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
                Đây là trang Dashboard sau khi user:&nbsp;
                <Typography
                    variant="span"
                    sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}
                >
                    {user?.email}
                </Typography>
                &nbsp; đăng nhập thành công thì mới cho truy cập vào.
            </Alert>

            <Button
                type="button"
                variant="contained"
                color="info"
                size="large"
                sx={{ mt: 2, maxWidth: 'max-content', alignSelf: 'flex-end' }}
                onClick={handleLogout}
            >
                Đăng xuất
            </Button>

            <Divider sx={{ my: 2 }} />
        </Box>
    );
}

export default Dashboard;
