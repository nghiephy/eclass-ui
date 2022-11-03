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

const cx = classNames.bind(styles);

const MENU_ITEMS_POST = [
    {
        title: 'Chỉnh sửa',
    },
    {
        title: 'Xoá',
    },
];

function PostItem({ data }) {
    const axiosPrivate = useAxiosPrivate();

    const handleOnChange = async (menuItem) => {
        console.log(menuItem);
    };

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

            <Link to="/" className={cx('content')}>
                <div className={cx('type-question')}>
                    <div className={cx('img-box')}>
                        <Images
                            alt="type question icon"
                            src={data?.avatar ? `http://localhost:8080${data.avatar}` : images.noAvatar}
                        />
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('body-content')}>
                        <h4 className={cx('title')}>Cho biết những con vật có 4 chân?</h4>
                        <p className={cx('deadline')}>Không có ngày đến hạn</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default PostItem;
