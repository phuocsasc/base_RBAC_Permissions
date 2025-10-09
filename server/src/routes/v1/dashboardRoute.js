import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { dashboardController } from '~/controllers/dashboardController';
import { authMiddleware } from '~/middlewares/authMiddleware';
import { rbacMiddleware_Level_1 } from '~/middlewares/rbacMiddleware';
import { MOCK_ROLES_LEVEL_1 } from '~/models/mockDatabase-level-1';

const Router = express.Router();

Router.route('/access').get(authMiddleware.isAuthorized, dashboardController.access);

// Ví dụ API /messages cần quyền admin hoặc moderator để truy cập:
Router.route('/messages').get(
    authMiddleware.isAuthorized,
    rbacMiddleware_Level_1.isValidPermission([MOCK_ROLES_LEVEL_1.ADMIN, MOCK_ROLES_LEVEL_1.MODERATOR]),
    (req, res) => {
        res.status(StatusCodes.OK).json({ message: 'Truy cập API GET: /message thành công!' });
    },
);

// Ví dụ API /admin-tools cần quyền admin hoặc moderator để truy cập:
Router.route('/admin-tools').get(
    authMiddleware.isAuthorized,
    rbacMiddleware_Level_1.isValidPermission([MOCK_ROLES_LEVEL_1.ADMIN]),
    (req, res) => {
        res.status(StatusCodes.OK).json({ message: 'Truy cập API GET: /admin-tools thành công!' });
    },
);

export const dashboardRoute = Router;
