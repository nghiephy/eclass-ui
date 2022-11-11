import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '~/components/Button';
import { MyIcon } from '~/components/MyIcons';
import { IcBars, IcCircleQuestion, IcKeyboard, IcLanguage } from '~/components/MyIcons/regular';
import { CreateClass, JoinClass } from '../Modals';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popover/Menu';
import useLogout from '~/hooks/useLogout';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);

function Header({ toggleSidebar }) {
    const { auth } = useAuth();
    const [openCreate, setOpenCreate] = useState(false);
    const closeModalCreate = () => setOpenCreate(false);
    const [openJoin, setOpenJoin] = useState(false);
    const closeModalJoin = () => setOpenJoin(false);
    const navigate = useNavigate();
    const logout = useLogout();
    const MENU_ITEMS = [
        {
            icon: (
                <MyIcon>
                    <IcCircleQuestion />
                </MyIcon>
            ),
            title: 'Trang cá nhân',
            to: `/profile/${auth.id}`,
        },
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
                    <IcKeyboard />
                </MyIcon>
            ),
            title: 'Đăng xuất',
        },
    ];

    const signOut = async () => {
        await logout();
        navigate('/login');
    };

    const handleOnChange = async (menuItem) => {
        if (menuItem.title === 'Đăng xuất') {
            signOut();
        }
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

                <Link to="/" className={cx('logo')}>
                    <div className={cx('logo-imgbox')}>
                        <img src={images.logo} alt="logo"></img>
                    </div>
                    <h2 className={cx('logo-title')}>EClass - Lớp học trực tuyến</h2>
                </Link>
            </div>

            <div className={cx('header-right')}>
                <Tippy
                    delay={[250, 80]}
                    offset={[10, 5]}
                    moveTransition="transform 0.2s ease-out"
                    hideOnClick={false}
                    arrow={false}
                    content="Tạo lớp học mới"
                    placement="bottom"
                >
                    <Button primary className={cx('header-right-item')} onClick={() => setOpenCreate((o) => !o)}>
                        Tạo
                    </Button>
                </Tippy>
                <CreateClass open={openCreate} closeOnDocumentClick onClose={closeModalCreate} />

                <Tippy
                    delay={[300, 80]}
                    offset={[10, 5]}
                    moveTransition="transform 0.2s ease-out"
                    hideOnClick={false}
                    arrow={false}
                    content="Tham gia lớp học"
                    placement="bottom"
                >
                    <Button primary className={cx('header-right-item')} onClick={() => setOpenJoin((o) => !o)}>
                        Tham gia
                    </Button>
                </Tippy>
                <JoinClass open={openJoin} closeOnDocumentClick onClose={closeModalJoin} />

                <Menu placement="bottom-end" arrow items={MENU_ITEMS} onChange={handleOnChange}>
                    <Button circle className={cx('user')}>
                        <div className={cx('user-imgbox')}>
                            <img
                                src={auth.avatar ? `http://localhost:8080${auth.avatar}` : images.logo}
                                alt="user avatar"
                                className={cx('user-img')}
                            />
                        </div>
                    </Button>
                </Menu>
            </div>
        </div>
    );
}

export default Header;
