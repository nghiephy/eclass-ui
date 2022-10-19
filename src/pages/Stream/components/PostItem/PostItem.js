import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';

import { MyIcon } from '~/components/MyIcons';
import { IcThreeDotsVertical } from '~/components/MyIcons/regular';
import Button from '~/components/Button';
import Inputs from '~/components/Inputs';

import styles from './PostItem.module.scss';
import Images from '~/components/Images';
import images from '~/assets/images';
import Menu from '~/components/Popover/Menu';

const cx = classNames.bind(styles);

const MENU_ITEMS_POST = [
    {
        title: 'Chỉnh sửa',
    },
    {
        title: 'Xoá',
    },
];

function PostItem() {
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

            <div className={cx('content')}>
                <div className={cx('author')}>
                    <div className={cx('img-box')}>
                        <Images alt="author-avatar" src={images.noAvatar} />
                    </div>
                    <div className={cx('author-infor')}>
                        <h2 className={cx('name')}>Nguyen Lap Nghiep</h2>
                        <p className={cx('time')}>1/12/2000</p>
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('body-content')}>Lớp học bắt đầu</div>
                    <div className={cx('body-attach')}></div>
                </div>
            </div>
            <div className={cx('comment')}></div>
        </div>
    );
}

export default PostItem;
