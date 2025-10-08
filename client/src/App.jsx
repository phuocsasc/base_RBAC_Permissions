import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from '~/pages/Login';
import Dashboard from '~/pages/Dashboard';
import NotFound from '~/pages/NotFound';
import AccessDenied from '~/pages/AccessDenied';

/**
 * Giải pháp Clean Code trong việc xác định các route nào cần đăng nhập tài khoản xong thì mới cho truy cập
 * Sử dụng <Outlet /> của react-router-dom để hiển thị các Child Route
 */
const ProtectedRoutes = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    console.log('user: ', user);
    if (!user) {
        return <Navigate to="/login" replace={true} />;
    }
    return <Outlet />;
};

const UnauthorizedRoutes = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    console.log('user: ', user);
    if (user) {
        return <Navigate to="/dashboard" replace={true} />;
    }
    return <Outlet />;
};

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace={true} />} />

            <Route element={<UnauthorizedRoutes />}>
                {/* <Outlet /> của react-router-dom sẽ chạy vào các child route trong này */}
                <Route path="/login" element={<Login />} />
                {/* Sau này sẽ còn nhiều Route nữa ở đây ...v.v */}
            </Route>

            <Route element={<ProtectedRoutes />}>
                {/* <Outlet /> của react-router-dom sẽ chạy vào các child route trong này */}
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Tất cả elemennt ở đây đều gọi tới cùng component Dashboard vì chúng ta đang gom chung
                    các pages dưới dạng tabs và code hết trong component Dashboard này để test cho gọn, 
                    thực tế có thể tách pages vào các component khác nhau tùy dự án */}
                <Route path="/support" element={<Dashboard />} />
                <Route path="/messages" element={<Dashboard />} />
                <Route path="/revenue" element={<Dashboard />} />
                <Route path="/admin-tools" element={<Dashboard />} />
            </Route>
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
