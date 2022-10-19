import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import Button from '~/components/Button';
import { MyIcon } from '~/components/MyIcons';
import { IcDot, IcExercise, IcGradeBook, IcThreeDotsVertical } from '~/components/MyIcons/regular';
import Menu from '~/components/Popover/Menu';

import styles from './ClassItem.module.scss';

const cx = classNames.bind(styles);

const MENU_ITEMS_STUDY = [
    {
        title: 'Huỷ đăng ký',
    },
];
const MENU_ITEMS_TEACH = [
    {
        title: 'Chỉnh sửa',
    },
    {
        title: 'Xoá',
    },
];

function ClassItem({ data }) {
    const handleOnChange = async (menuItem) => {
        if (menuItem.title === 'Huỷ đăng ký') {
            alert('Huy dang ky');
        }
    };

    return (
        <div className={'xl-2-4 l-3 m-4 c-12 g-16 col'}>
            <div className={cx('wrapper')}>
                <div className={cx('more-btn-wrapper')}>
                    <Menu
                        arrow={false}
                        hideOnClick={true}
                        trigger={'click'}
                        placement="bottom-end"
                        delay={[50, 50]}
                        items={data.userId === data.teacherId ? MENU_ITEMS_TEACH : MENU_ITEMS_STUDY}
                        onChange={handleOnChange}
                        className={cx('menu-more')}
                    >
                        <Button circle className={cx('more-btn')}>
                            <MyIcon className={cx('more-icon')}>
                                <IcThreeDotsVertical />
                            </MyIcon>
                        </Button>
                    </Menu>
                </div>

                <div className={cx('header')}>
                    <img src={images.classCover} alt="class cover" className={cx('header-img')} />
                    <div className={cx('header-content')}>
                        <Link to={`/stream/${data.classId}`} className={cx('name-class')}>
                            <h2 className={cx('name')}>{data.className}</h2>
                            <p className={cx('semester')}>{data.semester}</p>
                        </Link>
                        <h5 className={cx('teacher-name')}>Giáo viên: {data.teacherName}</h5>
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('body-item')}>
                        <MyIcon className={cx('icon')}>
                            <IcDot />
                        </MyIcon>
                        <Link to={'/exercise'} className={cx('text')}>
                            Bai tap can hoan thanh
                        </Link>
                    </div>
                </div>
                <div className={cx('bottom')}>
                    <Tippy
                        delay={[300, 80]}
                        offset={[10, 5]}
                        moveTransition="transform 0.2s ease-out"
                        hideOnClick={false}
                        arrow={false}
                        content="Mở trang quản lí điểm"
                        placement="bottom"
                    >
                        <Button circle className={cx('action-btn')}>
                            <MyIcon className={cx('action-icon')}>
                                <IcGradeBook />
                            </MyIcon>
                        </Button>
                    </Tippy>

                    <Tippy
                        delay={[300, 80]}
                        offset={[10, 5]}
                        moveTransition="transform 0.2s ease-out"
                        hideOnClick={false}
                        arrow={false}
                        content="Mở trang bài tập"
                        placement="bottom"
                    >
                        <Button circle className={cx('action-btn')}>
                            <MyIcon className={cx('action-icon')}>
                                <IcExercise />
                            </MyIcon>
                        </Button>
                    </Tippy>
                </div>
            </div>
        </div>
    );
}

export default ClassItem;
