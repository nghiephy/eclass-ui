const routes = {
    home: '/',
    login: '/login',
    register: '/register',
    stream: '/stream/:id',
    classwork: '/classwork',
    exercise: '/exercise/:role/:classId/:topic',
    postDetail: '/exercise/:role/:classId/:type/:postId/detail',
    member: '/member/:classId/:filter',
    grade: '/grade',
    profile: '/profile/:userId',
    forgotPassword: '/forgot-password',
};

export default routes;
