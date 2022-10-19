import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import images from '~/assets/images';
import Button from '~/components/Button';
import Images from '~/components/Images';
import { Post } from './components/Modals';
import PostItem from './components/PostItem';

import styles from './Stream.module.scss';

const cx = classNames.bind(styles);

function Stream() {
    const [openPost, setOpenCreate] = useState(false);
    const closeModalPost = () => setOpenCreate(false);

    const toggleSidebar = () => {
        setOpenCreate(!openPost);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('background-cover')}>
                <Images src={images.classCover} alt="class cover" className={cx('background-img')} />
                <h2 className={cx('class-name')}>Javascript</h2>
                <Button outline className={cx('config-btn')}>
                    Chỉnh sửa
                </Button>
            </div>
            <div className={cx('container')}>
                <div className={cx('annouce-board')}>
                    <h4 className={cx('annouce-title')}>Bảng thông báo</h4>
                    <div className={cx('annouce-panel')}>
                        <h2 className={cx('label')}>Mã mời</h2>
                        <h2 className={cx('key')}>012SBAA</h2>
                    </div>
                    <div className={cx('annouce-panel', 'view-all')}>
                        <h2 className={cx('label')}>Công việc sắp tới</h2>
                        <Link to="" className={cx('item')}>
                            - Làm bài tập trang 22 Làm bài tập trang 22
                        </Link>
                        <Button to="/" text className={cx('control-btn')}>
                            Xem tất cả
                        </Button>
                    </div>
                </div>
                <div className={cx('timeline')}>
                    <div className={cx('post-section')} onClick={toggleSidebar}>
                        <Images src={images.logo} alt="avatar" className={cx('avatar')} />
                        <span className={cx('label')}>Nhập thông báo cho lớp học</span>
                    </div>

                    <Post open={openPost} closeOnDocumentClick onClose={closeModalPost} />

                    <PostItem />
                </div>
            </div>
        </div>
    );
}

export default Stream;
