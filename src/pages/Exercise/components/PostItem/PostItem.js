import classNames from 'classnames/bind';
import 'reactjs-popup/dist/index.css';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';

import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import { MyIcon } from '~/components/MyIcons';
import { IcThreeDotsVertical } from '~/components/MyIcons/regular';
import Button from '~/components/Button';

import styles from './PostItem.module.scss';
import Images from '~/components/Images';
import images from '~/assets/images';
import Menu from '~/components/Popover/Menu';
import AttachItem from '~/components/Attachment/AttachItem';
import CommentForm from './CommentForm';
import { Link } from 'react-router-dom';
import moment from 'moment';

const cx = classNames.bind(styles);

const MENU_ITEMS_POST = [
    {
        title: 'Chỉnh sửa',
    },
    {
        title: 'Xoá',
    },
];

function PostItem({ data, role, classId }) {
    const axiosPrivate = useAxiosPrivate();
    const handleOnChange = async (menuItem) => {
        console.log(menuItem);
    };
    let icon = images.noImage;
    if (data?.type === 'TL') {
        icon = images.materialIcon;
    }
    if (data?.type === 'BT') {
        icon = images.exerciseIcon;
    }
    if (data?.type === 'CH') {
        icon = images.questionIcon;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('more-btn-wrapper')}>
                <Menu
                    arrow={false}
                    hideOnClick={true}
                    trigger={'click'}
                    placement="bottom-end"
                    delay={[50, 50]}
                    items={MENU_ITEMS_POST}
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

            <Link to={`/exercise/${role}/${classId}/${data?.type}/${data?.postId}/detail`} className={cx('content')}>
                <div className={cx('type-question')}>
                    <div className={cx('img-box')}>
                        <Images alt="type question icon" src={icon} />
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('body-content')}>
                        <h4 className={cx('title')}>{data?.content}</h4>
                        <p className={cx('deadline')}>
                            {data?.deadline ? moment(data.deadline).format('DD/MM/YYYY') : 'Không có ngày đến hạn'}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default PostItem;
