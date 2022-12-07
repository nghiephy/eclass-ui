import classNames from 'classnames/bind';
import { forwardRef, useEffect, useState } from 'react';

import styles from './Sidebar.module.scss';
import ListItem from './components/ListItem';
import images from '~/assets/images';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);

const SIDEBAR_TOP_ITEMS = [
    {
        image: images.class,
        name: 'Lớp học',
        path: '/',
    },
    {
        image: images.calendar,
        name: 'Lịch',
        path: '/calendar',
    },
];
const SIDEBAR_BOTTOM_ITEMS = [
    {
        image: images.saved,
        name: 'Lớp học đã lưu trữ',
        path: '/class-stored',
    },
    {
        image: images.setting,
        name: 'Cài đặt',
        path: '/setting',
    },
];
const TEACH_CLASSES = [
    {
        image: images.listCheck,
        name: 'Cần đánh giá',
        path: '/todo-mark/not-marked/all',
    },
];
const STUDY_CLASSES = [
    {
        image: images.todolist,
        name: 'Việc cần làm',
        path: '/todo-exercise/not-submitted/all',
    },
];

const Sidebar = forwardRef(({ show, ...passProps }, ref) => {
    const axiosPrivate = useAxiosPrivate();
    const { classData } = useAuth();
    const [classes, setClasses] = useState({});
    const [openStreamNav, setOpenStreamNav] = useState(false);
    const SIDEBAR_NAVIGATION = [
        {
            image: images.class,
            name: 'Bảng tin',
            path: `/stream/${classData?.classId}`,
        },
        {
            image: images.calendar,
            name: 'Bài tập',
            path: `/exercise/${classData?.role}/${classData?.classId}/0`,
        },
        {
            image: images.calendar,
            name: 'Thành viên',
            path: `/member/all`,
        },
        {
            image: images.calendar,
            name: 'Bài thi',
            path: `/exam`,
        },
    ];

    if (classData?.role === 't') {
        SIDEBAR_NAVIGATION.push({
            image: images.calendar,
            name: 'Điểm',
            path: '/grade/mark',
        });
    }

    const checkOpenStreamNav = () => {
        const path = window.location.pathname;
        if (
            path.includes('/stream') ||
            path.includes('/exercise') ||
            path.includes('/member') ||
            path.includes('/exam') ||
            path.includes('/grade')
        ) {
            setOpenStreamNav(true);
        } else {
            setOpenStreamNav(false);
        }
    };

    useEffect(() => {
        checkOpenStreamNav();
    }, [show]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getClasses = async () => {
            try {
                const response = await axiosPrivate.get('/class/getall', {
                    signal: controller.signal,
                });
                isMounted && setClasses(response.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        getClasses();
        checkOpenStreamNav();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    return (
        <div {...passProps} className={cx('wrapper', { show: show })}>
            <ListItem dataActions={SIDEBAR_TOP_ITEMS} bottomline />
            <div className={cx('sidebar-navigation', { hidden: !openStreamNav })}>
                <ListItem dataActions={SIDEBAR_NAVIGATION} bottomline />
            </div>
            <ListItem title="Giảng dạy" dataActions={TEACH_CLASSES} data={classes?.classTeach} bottomline />
            <ListItem title="Học tập" dataActions={STUDY_CLASSES} data={classes?.classStudy} bottomline />
            <ListItem dataActions={SIDEBAR_BOTTOM_ITEMS} />
        </div>
    );
});

export default Sidebar;
