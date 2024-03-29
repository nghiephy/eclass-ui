import config from '~/config';

// Import Layouts
import { LoginRegisterLayout } from '~/layouts';
import { HomeLayout } from '~/layouts';
import { ToDoLayout } from '~/layouts';
import { Fragment } from 'react';

// Import Pages
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import ForgotPassword from '~/pages/ForgotPassword';
import Stream from '~/pages/Stream';
import Member from '~/pages/Member';
import Exercise from '~/pages/Exercise';
import MarkExercise from '~/pages/MarkExercise';
import Grade from '~/pages/Grade';
import PostDetail from '~/pages/PostDetail';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Calendar from '~/pages/Calendar';
import ToDoExercise from '~/pages/ToDoExercise';
import ToDoMark from '~/pages/ToDoMark';
import Exam from '~/pages/Exam';
import CreateExam from '~/pages/CreateExam';
import JoinExam from '~/pages/JoinExam';
import UnAuthorized from '~/pages/UnAuthorized';

const publicRoutes = [
    { path: config.routes.login, component: Login, layout: LoginRegisterLayout },
    { path: config.routes.register, component: Register, layout: LoginRegisterLayout },
    { path: config.routes.forgotPassword, component: ForgotPassword, layout: LoginRegisterLayout },
    { path: config.routes.unauthorized, component: UnAuthorized, layout: null },
];

const privateRoutes = [
    { path: config.routes.stream, component: Stream },
    { path: config.routes.member, component: Member },
    { path: config.routes.exam, component: Exam },
    { path: config.routes.createExam, component: CreateExam },
    { path: config.routes.detailExam, component: CreateExam },
    { path: config.routes.joinExam, component: JoinExam },
    { path: config.routes.exercise, component: Exercise },
    { path: config.routes.grade, component: Grade },
    { path: config.routes.notSubmitted, component: ToDoExercise, layout: ToDoLayout },
    { path: config.routes.toDoMark, component: ToDoMark, layout: ToDoLayout },
    { path: config.routes.markExercise, component: MarkExercise },
    { path: config.routes.postDetail, component: PostDetail },
    { path: config.routes.home, component: Home, layout: HomeLayout },
    { path: config.routes.profile, component: Profile, layout: HomeLayout },
    { path: config.routes.calendar, component: Calendar, layout: HomeLayout },
];

export { publicRoutes, privateRoutes };
