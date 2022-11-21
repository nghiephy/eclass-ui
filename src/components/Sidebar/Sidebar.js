import classNames from 'classnames/bind';
import { forwardRef, useEffect, useState } from 'react';

import styles from './Sidebar.module.scss';
import ListItem from './components/ListItem';
import images from '~/assets/images';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

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
    const [classes, setClasses] = useState({});

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

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    return (
        <div {...passProps} className={cx('wrapper', { show: show })}>
            <ListItem dataActions={SIDEBAR_TOP_ITEMS} bottomline />
            <ListItem title="Giảng dạy" dataActions={TEACH_CLASSES} data={classes?.classTeach} bottomline />
            <ListItem title="Học tập" dataActions={STUDY_CLASSES} data={classes?.classStudy} bottomline />
            <ListItem dataActions={SIDEBAR_BOTTOM_ITEMS} />
        </div>
    );
});

export default Sidebar;
