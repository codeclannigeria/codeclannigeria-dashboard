import { Request, Response } from 'express';

function getFakeCaptcha(req: Request, res: Response) {
  return res.json('captcha-xxx');
}

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

/**
 *The permissions of the current user, if it is empty, it means that there is no login
 *current user access, if is'', user need login
 *If it is a pro preview, it is authorized by default
 */
let access = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';

const getAccess = () => access;

// The code will be compatible with the local service mock and the static data of the deployment site
export default {
  // Supports Object and Array values
  'GET /api/profile': (req: Request, res: Response) => {
    if (!getAccess()) {
      res.status(401).send({
        data: {
          isLogin: false,
        },
        errorCode: '401',
        errorMessage: 'Please login first!',
        success: true,
      });
      return;
    }
    res.send({
      role: 'ADMIN',
      id: '5ee9ab7966f71c12871ec2d2',
      updatedAt: '2020-09-23T23:22:46.712Z',
      createdAt: '2020-06-17T05:32:24.092Z',
      firstName: 'Fortune',
      lastName: 'Ochi',
      email: 'string@email.com',
      description: 'Obsessed with quality!',
      city: 'Toronto',
      country: 'Canada',
      gender: 'MALE',
      dob: '2000-07-12T08:36:42.901Z',
      phoneNumber: '08098877745',
      technologies: ['JavaScript', 'Java', 'C#'],
      photoUrl: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      notifyCount: 0,
      notifUnreadCount: 0,
      tracks: [
        {
          id: '5ef1def71fd7f916461ef50f',
          updatedAt: '2020-07-12T08:36:42.901Z',
          createdAt: '2020-06-23T10:51:05.867Z',
          title: 'MOBILE',
          description: 'string',
          thumbnailUrl:
            'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        },
        {
          id: '5f0731042133ba68461a1396',
          updatedAt: '2020-07-09T14:09:24.774Z',
          createdAt: '2020-07-09T14:09:24.774Z',
          title: 'TITLE',
          description: '5',
          thumbnailUrl: null,
        },
        {
          id: '5ef1dd2e55aeac14d64575dd',
          updatedAt: '2020-07-12T08:31:31.435Z',
          createdAt: '2020-06-23T10:44:52.851Z',
          title: 'STRING',
          description: 'string',
          thumbnailUrl: null,
        },
      ],
    });
  },
  // GET POST can be omitted
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black Crayon',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/auth/login': (req: Request, res: Response) => {
    const { password, email } = req.body;
    if (password === 'admin' && email === 'admin@email.com') {
      res.send({
        accessToken: 'accessToken',
      });
      access = 'admin';
      return;
    }
    if (password === 'mentor' && email === 'mentor@email.com') {
      res.send({
        accessToken: 'accessToken',
        currentAuthority: 'user',
      });
      access = 'user';
      return;
    }

    res.send({
      status: 'error',
      currentAuthority: 'guest',
    });
    access = 'guest';
  },
  'GET /api/login/outLogin': (req: Request, res: Response) => {
    access = '';
    res.send({ data: {}, success: true });
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user', success: true });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET  /api/login/captcha': getFakeCaptcha,
};
