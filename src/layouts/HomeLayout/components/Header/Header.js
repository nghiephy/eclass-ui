import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useState } from 'react';

import Button from '~/components/Button';
import { MyIcon } from '~/components/MyIcons';
import { IcBars, IcCircleQuestion, IcKeyboard, IcLanguage } from '~/components/MyIcons/regular';
import { CreateClass, JoinClass } from '../Modals';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popover/Menu';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: (
            <MyIcon>
                <IcLanguage />
            </MyIcon>
        ),
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
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
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: (
            <MyIcon>
                <IcKeyboard />
            </MyIcon>
        ),
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const [openCreate, setOpenCreate] = useState(false);
    const closeModalCreate = () => setOpenCreate(false);
    const [openJoin, setOpenJoin] = useState(false);
    const closeModalJoin = () => setOpenJoin(false);

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
                    <Button circle className={cx('sidebar-btn')}>
                        <MyIcon className={cx('sidebar-icon')}>
                            <IcBars />
                        </MyIcon>
                    </Button>
                </Tippy>

                <div className={cx('logo')}>
                    <div className={cx('logo-imgbox')}>
                        <img src={images.logo} alt="logo"></img>
                    </div>
                    <h2 className={cx('logo-title')}>EClass - Lớp học trực tuyến</h2>
                </div>
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
                            <img src={images.logo} alt="user avatar" className={cx('user-img')} />
                        </div>
                    </Button>
                </Menu>
            </div>
        </div>
    );
}

export default Header;
