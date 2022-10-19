import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import Button from '~/components/Button';
import { MyIcon } from '~/components/MyIcons';
import { IcCalendar, IcPenCheck, IcTodoList } from '~/components/MyIcons/regular';
import styles from './Profile.module.scss';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import Images from '~/components/Images';
import images from '~/assets/images';
import Inputs from '~/components/Inputs';

const cx = classNames.bind(styles);

function Profile() {
    return (
        <div className={cx('wrapper')}>
            <form action="#" method="POST" id="account-detail-form" enctype="multipart/form-data">
                <div className={cx('image-block', 'form-group')}>
                    <div className={cx('block-account')}>
                        <div className={cx('block-account__imgBox')}>
                            <Images src={images.noAvatar} alt="avatar" />
                            <label for="avatar-upload">Chọn ảnh</label>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                name="avatar_account"
                                id="avatar-upload"
                            />
                        </div>
                        <div className={cx('block-account__body')}>
                            <h5 className={cx('name')}>Nguyen Lap Nghiep</h5>
                            <p className={cx('message')}>Dung lượng file tối đa 1MB.</p>
                            <p className={cx('message')}>Định dạng: .JPEG, .PNG.</p>
                        </div>
                    </div>
                </div>
                <h5 className={cx('form-section-title')}>Thông tin tài khoản</h5>
                <div className={cx('input-block')}>
                    <Inputs className={cx('input')} primary name="username" type="text" label="Họ và tên" />
                    <Inputs className={cx('input')} primary name="email" type="text" label="Email" />
                    <Inputs className={cx('input')} primary name="birthday" type="text" label="Ngày sinh" />
                    <Inputs
                        className={cx('input')}
                        primary
                        readOnly
                        name="createdDate"
                        type="text"
                        label="Ngày tham gia"
                    />
                </div>
                <div className={cx('action-section')}>
                    <Button primary type="submit" className={cx('update-btn')} id="account-submit-btn">
                        Cập nhật
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Profile;
