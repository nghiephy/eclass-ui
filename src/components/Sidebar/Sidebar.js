import classNames from 'classnames/bind';
import { forwardRef } from 'react';

import styles from './Sidebar.module.scss';
import ListItem from './components/ListItem';
import images from '~/assets/images';

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
        image: images.default_icon_class,
        name: 'Javascript Basic',
        semeter: 'HK1 2022-2023',
        path: '/javascript',
    },
];
const STUDY_CLASSES = [
    {
        image: images.default_icon_class,
        name: 'HTML, CSS Basic',
        semeter: 'HK1 2022-2023',
        path: '/javascript',
    },
    {
        image: images.default_icon_class,
        name: 'Backend Developer 2022',
        semeter: 'HK1 2022-2023',
        path: '/javascript',
    },
];

const Sidebar = forwardRef(({ show, ...passProps }, ref) => {
    return (
        <div {...passProps} className={cx('wrapper', { show: show })}>
            <ListItem data={SIDEBAR_TOP_ITEMS} bottomline />
            <ListItem title="Giảng dạy" data={TEACH_CLASSES} bottomline />
            <ListItem title="Học tập" data={STUDY_CLASSES} bottomline />
            <ListItem data={SIDEBAR_BOTTOM_ITEMS} />
        </div>
    );
});

export default Sidebar;
