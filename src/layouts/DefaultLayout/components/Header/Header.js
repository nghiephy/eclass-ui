import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import { MyIcon } from '~/components/MyIcons';
import { IcBars, IcCircleQuestion, IcKeyboard, IcLanguage } from '~/components/MyIcons/regular';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popover/Menu';
import { Link } from 'react-router-dom';
import TabList from '../TabList';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: (
            <MyIcon>
                <IcLanguage />
            </MyIcon>
        ),
        title: 'Ngôn Ngữ',
        children: {
            title: 'Ngôn Ngữ',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'Tiếng Anh',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: (
            <MyIcon>
                <IcCircleQuestion />
            </MyIcon>
        ),
        title: 'Trang cá nhân',
        to: '/profile',
    },
    {
        icon: (
            <MyIcon>
                <IcKeyboard />
            </MyIcon>
        ),
        title: 'Đăng xuất',
    },
];
const DATA_TABS = [
    {
        title: 'Bảng tin',
        path: '/stream',
    },
    {
        title: 'Bài tập',
        path: '/homework',
    },
    {
        title: 'Thành viên',
        path: '/member',
    },
    {
        title: 'Điểm',
        path: '/grade',
    },
];

function Header({ toggleSidebar }) {
    const handleOnChange = (menuItem) => {
        console.log(menuItem);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-left')}>
                <Tippy
                    delay={[300, 80]}
                    offset={[10, 5]}
                    moveTransition="transform 0.2s ease-out"
                    hideOnClick={false}
                    arrow={false}
                    content="Thanh công cụ"
                    placement="bottom"
                >
                    <Button circle className={cx('sidebar-btn')} onClick={toggleSidebar}>
                        <MyIcon className={cx('sidebar-icon')}>
                            <IcBars />
                        </MyIcon>
                    </Button>
                </Tippy>

                <div className={cx('class-name')}>
                    <Link to="/stream" className={cx('name')}>
                        Javascript
                    </Link>
                </div>
            </div>

            <div className={cx('header-middle')}>
                <TabList data={DATA_TABS} />
            </div>

            <div className={cx('header-right')}>
                <Menu placement="bottom-end" arrow items={MENU_ITEMS} onChange={handleOnChange}>
                    <Button circle className={cx('user')}>
                        <div className={cx('user-imgbox')}>
                            <img src={images.logo} alt="user avatar" className={cx('user-img')} />
                        </div>
                    </Button>
                </Menu>
            </div>
        </div>
    );
}

export default Header;
