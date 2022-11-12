import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import images from '~/assets/images';
import Button from '~/components/Button';
import Images from '~/components/Images';
import { Post } from './components/Modals';
import PostItem from './components/PostItem';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useAuth from '~/hooks/useAuth';

import styles from './Stream.module.scss';
import EnrollSection from './EnrollSection';

const cx = classNames.bind(styles);

const MENU_TEACHER_ENROLL = [
    {
        title: 'Đổi mã',
    },
    {
        title: 'Sao chép mã',
    },
    {
        title: 'Vô hiệu hoá',
    },
    {
        title: 'Ẩn mã',
    },
];

const MENU_STUDENT_ENROLL = [
    {
        title: 'Sao chép mã',
    },
    {
        title: 'Báo cáo',
    },
];

function Stream() {
    const { id } = useParams();
    // let [searchParams, setSearchParams] = useSearchParams();
    const axiosPrivate = useAxiosPrivate();
    const { auth, handleSetClassData, classData: classDataLocal } = useAuth();
    const [posts, setPosts] = useState([]);
    const [classData, setClassData] = useState();
    const [menuEnroll, setMenuEnroll] = useState([]);
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
        setClassData((prev) => {
            return dataClass.data.data;
        });
        const role = auth.id === dataClass.data.data.teacherId ? 't' : 'h';
        handleSetClassData({ classId: dataClass.data.data.id, role });
        if (role === 't') {
            setMenuEnroll(MENU_TEACHER_ENROLL);
        } else {
            setMenuEnroll(MENU_STUDENT_ENROLL);
        }
    };

    useEffect(() => {
        // const curURL = window.location.pathname.split('/');
        // const classId = curURL[curURL.length - 1];

        // for (let entry of searchParams.entries()) {
        //     params.push(entry);
        // }
        getClassData(id);
        getPostData(id);
    }, [id]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('background-cover')}>
                <Images
                    src={classData?.coverImg ? `http://localhost:8080${classData.coverImg}` : images.classCover}
                    alt="class cover"
                    className={cx('background-img')}
                />
                <h2 className={cx('class-name')}>{classData?.name}</h2>
                <Button outline className={cx('config-btn')}>
                    Chỉnh sửa
                </Button>
            </div>
            <div className={cx('container')}>
                <div className={cx('annouce-board')}>
                    <h4 className={cx('annouce-title')}>Bảng thông báo</h4>
                    <EnrollSection data={classData} role={classDataLocal.role} menuEnroll={menuEnroll} />
                    <div className={cx('annouce-panel')}>
                        <h2 className={cx('label')}>Phòng học online</h2>
                        <Button to="/" primary className={cx('join-btn')}>
                            Tham gia
                        </Button>
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
                        <Images
                            src={auth.avatar ? `http://localhost:8080${auth.avatar}` : images.logo}
                            alt="avatar"
                            className={cx('avatar')}
                        />
                        <span className={cx('label')}>Nhập thông báo cho lớp học</span>
                    </div>

                    <Post open={openPost} closeOnDocumentClick onClose={closeModalPost} />

                    {posts.map((post, index) => {
                        return <PostItem key={index} data={post} avatarUser={auth.avatar} setPosts={setPosts} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default Stream;
