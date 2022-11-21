import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';

import images from '~/assets/images';
import Button from '~/components/Button';
import { MyIcon } from '~/components/MyIcons';
import { IcDot, IcExercise, IcGradeBook, IcThreeDotsVertical } from '~/components/MyIcons/regular';
import Menu from '~/components/Popover/Menu';

import styles from './ClassItem.module.scss';
import useAuth from '~/hooks/useAuth';
import { useEffect, useState } from 'react';
import EditClass from '../Modals/EditClass';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import moment from 'moment';

const cx = classNames.bind(styles);

const MENU_ITEMS_STUDY = [
    {
        title: 'Huỷ đăng ký',
        code: 'unenroll',
    },
];
const MENU_ITEMS_TEACH = [
    {
        title: 'Chỉnh sửa',
        code: 'edit',
    },
    {
        title: 'Xoá',
        code: 'delete',
    },
];

function ClassItem({ data, setClasses }) {
    const { auth, handleSetClassData } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const [toDoList, setToDoList] = useState([]);
    const [actionHidden, setActionHidden] = useState(false);
    const [openEditClass, setOpenEditClass] = useState(false);
    const closeEditClass = () => setOpenEditClass(false);

    const toggleEditClass = () => {
        setOpenEditClass(!openEditClass);
    };

    const handleUnEnroll = async () => {
        const response = await axiosPrivate.post(`/class/unenroll`, {
            classId: data.classId,
            userId: auth.id,
        });
        alert('Huỷ đăng ký lớp học thành công!');
        setClasses((prev) => {
            const newClassStudy = prev.classStudy.filter((item) => item.classId !== data.classId);

            return { ...prev, classStudy: newClassStudy };
        });
    };

    const handleDeleteClass = async () => {
        const response = await axiosPrivate.post(`/class/delete`, {
            classId: data.classId,
        });
        console.log(response);
        alert('Xoá lớp học thành công!');
        window.location.reload();
    };

    const handleOnChange = async (menuItem) => {
        if (menuItem.code === 'unenroll') {
            handleUnEnroll();
        }
        if (menuItem.code === 'edit') {
            toggleEditClass();
        }
        if (menuItem.code === 'delete') {
            handleDeleteClass();
        }
        setActionHidden((prev) => !prev);
    };

    const handleOpenExercise = (classId) => {
        if (data.userId === data.teacherId) {
            navigate(`/exercise/t/${classId}/0`);
            handleSetClassData({ classId: classId, role: 't' });
        } else {
            navigate(`/exercise/h/${classId}/0`);
            handleSetClassData({ classId: classId, role: 'h' });
        }
    };

    const handleOpenGrade = (classId) => {
        navigate('/grade/mark');
        handleSetClassData({ classId: classId, role: 't' });
    };

    const getTodoList = async (dataGet) => {
        let apiString = '/exercise/get-not-submitted';

        if (dataGet.userId === dataGet.teacherId) {
            apiString = '/exercise/get-not-marked';
        }

        const toDoListRes = await axiosPrivate.get(apiString, {
            params: {
                classId: dataGet.classId,
            },
        });
        const data = toDoListRes.data.exerciseRes;
        const dataDisplay = data.filter(
            (item) => moment(item.deadline).diff(moment(), 'weeks') === 0 && moment(item.deadline) > moment(),
        );
        setToDoList(dataDisplay.splice(0, 3));
        console.log(toDoListRes);
    };

    const handleClickToDo = (classId) => {
        if (data.userId === data.teacherId) {
            handleSetClassData({ classId: classId, role: 't' });
        } else {
            handleSetClassData({ classId: classId, role: 'h' });
        }
    };

    useEffect(() => {
        getTodoList(data);
    }, [data]);

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

                <div className={cx('header')}>
                    <img
                        src={data.coverImg ? `http://localhost:8080${data.coverImg}` : images.classCover}
                        alt="class cover"
                        className={cx('header-img')}
                    />
                    <div className={cx('header-content')}>
                        <Link to={`/stream/${data.classId}`} className={cx('name-class')}>
                            <h2 className={cx('name')}>{data.className}</h2>
                            <p className={cx('semester')}>{data.semester}</p>
                        </Link>
                        <Link to={`/profile/${data.teacherId}`} className={cx('teacher-name')}>
                            Giáo viên: {data.teacherName}
                        </Link>
                    </div>
                </div>
                <div className={cx('body')}>
                    {toDoList.map((item, index) => {
                        return (
                            <div key={index} className={cx('body-item')}>
                                <MyIcon className={cx('icon')}>
                                    <IcDot />
                                </MyIcon>
                                <Link
                                    to={
                                        data.userId === data.teacherId
                                            ? `/exercise/mark/1/${item.type}/${item.postId}`
                                            : `/exercise/h/${item.classId}/${item.type}/${item.postId}/detail`
                                    }
                                    className={cx('text')}
                                    onClick={() => handleClickToDo(data.classId)}
                                >
                                    {item.title}
                                </Link>
                            </div>
                        );
                    })}
                </div>
                <div className={cx('bottom')}>
                    {data.userId === data.teacherId && (
                        <Tippy
                            delay={[300, 80]}
                            offset={[10, 5]}
                            moveTransition="transform 0.2s ease-out"
                            hideOnClick={false}
                            arrow={false}
                            content="Mở trang quản lí điểm"
                            placement="bottom"
                        >
                            <Button circle className={cx('action-btn')} onClick={() => handleOpenGrade(data.classId)}>
                                <MyIcon className={cx('action-icon')}>
                                    <IcGradeBook />
                                </MyIcon>
                            </Button>
                        </Tippy>
                    )}

                    <Tippy
                        delay={[300, 80]}
                        offset={[10, 5]}
                        moveTransition="transform 0.2s ease-out"
                        hideOnClick={false}
                        arrow={false}
                        content="Mở trang bài tập"
                        placement="bottom"
                    >
                        <Button circle className={cx('action-btn')} onClick={() => handleOpenExercise(data.classId)}>
                            <MyIcon className={cx('action-icon')}>
                                <IcExercise />
                            </MyIcon>
                        </Button>
                    </Tippy>
                </div>
            </div>

            <EditClass open={openEditClass} closeOnDocumentClick onClose={closeEditClass} data={data} />
        </div>
    );
}

export default ClassItem;
