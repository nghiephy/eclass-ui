const routes = {
    home: '/',
    login: '/login',
    register: '/register',
    stream: '/stream/:id',
    classwork: '/classwork',
    exercise: '/exercise/:role/:classId/:topic',
    postDetail: '/exercise/:role/:classId/:type/:postId/detail',
    markExercise: '/exercise/mark/:userId/:type/:postId',
    member: '/member/:filter',
    notSubmitted: '/todo-exercise/:type/:filter',
    grade: '/grade/mark',
    profile: '/profile/:userId',
    forgotPassword: '/forgot-password',
};

export default routes;
