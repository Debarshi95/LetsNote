import loadable from './loadable';
import routes from '../constant/routes';

export default {
  home: {
    component: loadable(() => import('../pages/Home')),
    ...routes.home,
  },
  signUp: {
    component: loadable(() => import('../pages/SignUp')),
    ...routes.signUp,
  },
  signIn: {
    component: loadable(() => import('../pages/SignIn')),
    ...routes.signIn,
  },
  notes: {
    component: loadable(() => import('../pages/NoteList')),
    ...routes.notes,
  },
  create: {
    component: loadable(() => import('../pages/CreateNote')),
    ...routes.create,
  },
  edit: {
    component: loadable(() => import('../pages/UpdateNote')),
    ...routes.edit,
  },
  trash: {
    component: loadable(() => import('../pages/Trash')),
    ...routes.trash,
  },
};
