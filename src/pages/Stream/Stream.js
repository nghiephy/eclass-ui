import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import images from '~/assets/images';
import Button from '~/components/Button';
import Images from '~/components/Images';
import { Post } from './components/Modals';
import PostItem from './components/PostItem';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

import styles from './Stream.module.scss';

const cx = classNames.bind(styles);

function Stream() {
    let [searchParams, setSearchParams] = useSearchParams();
    const axiosPrivate = useAxiosPrivate();
    const [posts, setPosts] = useState([]);
    const [classId, setClassId] = useState();
    const [classData, setClassData] = useState();
    const [openPost, setOpenCreate] = useState(false);
    const closeModalPost = () => setOpenCreate(false);

    const toggleSidebar = () => {
        setOpenCreate(!openPost);
    };

    const getPostData = async (classId) => {
        const dataPost = await axiosPrivate.get(`/class/getpost/${classId}`);
        setPosts(dataPost.data.data);
    };
    const getClassData = async (classId) => {
        const dataClass = await axiosPrivate.get(`/class/${classId}`);
        setClassData(dataClass.data.data);
        console.log(dataClass);
    };

    useEffect(() => {
        const params = [];

        for (let entry of searchParams.entries()) {
            params.push(entry);
        }
        params.map(([keyVa, value]) => {
            if (keyVa === 'id') {
                getClassData(value);
                getPostData(value);
            }
        });
    }, []);

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

                    {posts.map((post, index) => {
                        return <PostItem key={index} data={post} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default Stream;
