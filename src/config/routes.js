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
    toDoMark: '/todo-mark/:type/:filter',
    notSubmitted: '/todo-exercise/:type/:filter',
    grade: '/grade/mark/:role/:classId',
    profile: '/profile/:userId',
    calendar: '/calendar',
    exam: '/exam',
    unauthorized: '/unauthorized',
    createExam: '/create-exam',
    detailExam: '/detail-exam/:postId',
    joinExam: '/join-exam/:postId/:takeId',
    forgotPassword: '/forgot-password',
};

export default routes;
