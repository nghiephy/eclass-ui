import classNames from 'classnames/bind';
import 'reactjs-popup/dist/index.css';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';

import { MyIcon } from '~/components/MyIcons';
import { IcThreeDotsVertical } from '~/components/MyIcons/regular';
import Button from '~/components/Button';

import styles from './MemberItem.module.scss';
import Images from '~/components/Images';
import Menu from '~/components/Popover/Menu';
import { Link } from 'react-router-dom';
import moment from 'moment';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);

const MENU_TEACHER_POST = [
    {
        title: 'Sao chép liên kết',
        code: 'copy',
    },
    {
        title: 'Xoá',
        code: 'delete',
    },
];
const MENU_STUDENT_POST = [
    {
        title: 'Sao chép liên kết',
    },
    {
        title: 'Báo cáo',
    },
];

function MemberItem({ data, role, classId }) {
    const { auth, classData } = useAuth();

    // const [dataExercise, setDataExercise] = useState();
    const [actionHidden, setActionHidden] = useState(false);

    const handleOnChange = async (menuItem) => {
        setActionHidden((prev) => !prev);
    };

    useEffect(() => {}, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('more-btn-wrapper', { hidden: data.userId === auth.id && classData.role === 't' })}>
                <Menu
                    arrow={false}
                    hideOnClick={true}
                    trigger={'click'}
                    placement="bottom-end"
                    delay={[50, 50]}
                    items={classData.role === 't' ? MENU_TEACHER_POST : MENU_STUDENT_POST}
                    onChange={handleOnChange}
                    className={cx('menu-more', { hidden: actionHidden })}
                >
                    <Button
                        circle
                        className={cx('more-btn')}
                        onClick={() => {
                            setActionHidden(false);
                        }}
                    >
                        <MyIcon className={cx('more-icon')}>
                            <IcThreeDotsVertical />
                        </MyIcon>
                    </Button>
                </Menu>
            </div>

            <Link to={`/profile/${data.userId}`} className={cx('content')}>
                <div className={cx('type-question')}>
                    <div className={cx('img-box')}>
                        <Images alt="type question icon" src={`http://localhost:8080${data.avatar}`} />
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('body-content')}>
                        <h4 className={cx('title')}>{data.fullName}</h4>
                        <p className={cx('deadline')}>
                            {' '}
                            Tham gia:&nbsp;&nbsp;&nbsp;&nbsp;
                            {data?.createdAt ? moment(data.createdAt).format('DD/MM/YYYY') : 'Không rõ'}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default MemberItem;
