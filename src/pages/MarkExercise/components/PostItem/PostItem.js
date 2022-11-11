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
import EditAssignment from '../Modals/EditAssignment';
import ConfirmForm from '../Modals/ConfirmForm';

const cx = classNames.bind(styles);

const MENU_TEACHER_POST = [
    {
        title: 'Chỉnh sửa',
        code: 'edit',
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

function PostItem({ data, role, classId, setExercises }) {
    const axiosPrivate = useAxiosPrivate();

    // const [dataExercise, setDataExercise] = useState();
    const [actionHidden, setActionHidden] = useState(false);
    const [openUpdateAssignment, setOpenUpdateAssignment] = useState(false);
    const closeUpdateAssignment = () => setOpenUpdateAssignment(false);
    const [openConfirmForm, setOpenConfirmForm] = useState(false);
    const closeConfirmForm = () => setOpenConfirmForm(false);

    const toggleUpdateAssigment = () => {
        setOpenUpdateAssignment(!openUpdateAssignment);
    };
    const toggleConfirmForm = () => {
        setOpenConfirmForm(!openConfirmForm);
    };
    console.log(data);
    const handleOnChange = async (menuItem) => {
        if (menuItem.code === 'edit') {
            if (data?.type === 'BT') {
                toggleUpdateAssigment();
            }
        }
        if (menuItem.code === 'delete') {
            toggleConfirmForm();
        }
        setActionHidden((prev) => !prev);
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

    const handleDeletePost = async () => {
        try {
            const deleteRes = await axiosPrivate.post(`/post/delete`, {
                postId: data?.postId,
                classId: data?.classId,
            });
            console.log(deleteRes);
            // setExercises((prev) => {
            //     const newExercises = prev.filter((item) => item.postId !== data?.postId);
            //     console.log(newExercises);
            //     return [...prev];
            // });
            window.location.reload();
        } catch (err) {
            console.log(err);
            alert('Xoá bài tập thất bại!');
        }
    };

    useEffect(() => {
        // setDataExercise({ ...data });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('more-btn-wrapper')}>
                <Menu
                    arrow={false}
                    hideOnClick={true}
                    trigger={'click'}
                    placement="bottom-end"
                    delay={[50, 50]}
                    items={role === 't' ? MENU_TEACHER_POST : MENU_STUDENT_POST}
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

            {data?.type === 'BT' && actionHidden ? (
                <EditAssignment
                    data={data}
                    // setData={data}
                    // attachment={null}
                    // setAttachment={null}
                    open={openUpdateAssignment}
                    isOpen={openUpdateAssignment}
                    closeOnDocumentClick
                    onClose={closeUpdateAssignment}
                />
            ) : (
                <></>
            )}
            {actionHidden ? (
                <ConfirmForm
                    handleDeletePost={handleDeletePost}
                    open={openConfirmForm}
                    closeOnDocumentClick
                    onClose={closeConfirmForm}
                />
            ) : (
                <></>
            )}
        </div>
    );
}

export default PostItem;
