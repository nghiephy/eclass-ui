import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

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
        code: 'changeKey',
    },
    {
        title: 'Sao chép mã',
    },
    {
        title: 'Vô hiệu hoá',
        code: 'blockKey',
    },
    {
        title: 'Ẩn mã',
        code: 'hiddenKey',
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
    const navigate = useNavigate();
    const { id } = useParams();
    // let [searchParams, setSearchParams] = useSearchParams();
    const axiosPrivate = useAxiosPrivate();
    const { auth, handleSetClassData, classData: classDataLocal } = useAuth();
    const [posts, setPosts] = useState([]);
    const [reviewImage, setReviewImage] = useState();
    const [imagefile, setImagefile] = useState('');
    const [coverImage, setCoverImage] = useState('');
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
        try {
            const dataClass = await axiosPrivate.get(`/class/${classId}`);
            setClassData((prev) => {
                return dataClass.data.data;
            });
            setCoverImage(dataClass.data?.data?.coverImg);
            const role = auth.id === dataClass.data?.data?.teacherId ? 't' : 'h';
            handleSetClassData({ classId: dataClass.data?.data?.id, role });
            if (role === 't') {
                setMenuEnroll(MENU_TEACHER_ENROLL);
            } else {
                setMenuEnroll(MENU_STUDENT_ENROLL);
            }
        } catch (error) {
            if (error.response.data.code === 'unauthorized') {
                navigate(`/unauthorized`);
            }
        }
    };

    const handleUpdateCover = async (file) => {
        const formData = new FormData();

        formData.append('cover_img', file);
        formData.append('old_cover', coverImage);
        formData.append('classId', classData.id);

        const response = await axiosPrivate.post(`/class/update-cover`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
        console.log('old-cover', coverImage);
        setCoverImage(response.data.coverImgPath);
        console.log(response);
    };

    const onAvatarChange = (e) => {
        setImagefile(e.target.files[0]);
        setReviewImage(URL.createObjectURL(e.target.files[0]));
        handleUpdateCover(e.target.files[0]);
    };

    console.log(classData);
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
                    src={
                        reviewImage
                            ? reviewImage
                            : coverImage
                            ? `http://localhost:8080${coverImage}`
                            : images.classCover
                    }
                    alt="class cover"
                    className={cx('background-img')}
                />
                <h2 className={cx('class-name')}>{classData?.name}</h2>

                {parseInt(classData?.teacherId) === auth.id && (
                    <label htmlFor="cover-upload" className={cx('config-btn')}>
                        Chỉnh sửa
                    </label>
                )}
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    name="avatar"
                    id="cover-upload"
                    disabled={!parseInt(classData?.teacherId) === auth.id}
                    onChange={onAvatarChange}
                />
                {/* <Button outline className={cx('config-btn')}>
                    Chỉnh sửa
                </Button> */}
            </div>
            <div className={cx('container')}>
                <div className={cx('annouce-board')}>
                    <h4 className={cx('annouce-title')}>Bảng thông báo</h4>
                    <EnrollSection
                        data={classData}
                        role={classDataLocal?.role}
                        menuEnroll={menuEnroll}
                        setClassData={setClassData}
                    />
                    <div className={cx('annouce-panel', { hidden: true })}>
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
