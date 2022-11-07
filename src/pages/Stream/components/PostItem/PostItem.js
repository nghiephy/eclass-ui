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
import useAuth from '~/hooks/useAuth';
import EditPost from '../Modals/EditPost';
import ConfirmForm from '../Modals/ConfirmForm';

const cx = classNames.bind(styles);

const MENU_TEACHER_POST = [
    {
        title: 'Chỉnh sửa',
        code: 'edit',
    },
    {
        title: 'Sao chép liên kết',
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

function PostItem({ data, avatarUser, setPosts }) {
    const { classData } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [showMoreCmt, setShowMoreCmt] = useState(true);
    const [attachment, setAttachment] = useState();
    const [comments, setComments] = useState([]);
    const [dataPost, setDataPost] = useState(data);

    const [actionHidden, setActionHidden] = useState(false);
    const [openEditPost, setOpenEditPost] = useState(false);
    const closeEditPost = () => setOpenEditPost(false);
    const [openConfirmForm, setOpenConfirmForm] = useState(false);
    const closeConfirmForm = () => setOpenConfirmForm(false);

    const toggleEditPost = () => {
        setOpenEditPost(!openEditPost);
    };
    const toggleConfirmForm = () => {
        setOpenConfirmForm(!openEditPost);
    };

    console.log(data);

    const handleOnChange = async (menuItem) => {
        if (menuItem.code === 'edit') {
            toggleEditPost();
        }
        if (menuItem.code === 'delete') {
            toggleConfirmForm();
        }
        setActionHidden((prev) => !prev);
    };

    const getAllComment = async () => {
        const allCommentRes = await axiosPrivate.get(`/comment/get-all`, {
            params: {
                postId: dataPost.postId,
                classId: dataPost.classId,
            },
        });
        setComments(allCommentRes.data.allComment);
    };

    const handleSubmitComment = async (comment) => {
        console.log('Comment', comment);
        const dataCommentRes = await axiosPrivate.post(`/comment/create`, {
            content: comment,
            postId: dataPost.postId,
            classId: dataPost.classId,
        });
        await getAllComment();
    };

    const handleDeletePost = async () => {
        const deleteRes = await axiosPrivate.post(`/post/delete`, {
            postId: dataPost.postId,
            classId: dataPost.classId,
        });
        console.log(deleteRes);
        setPosts(deleteRes.data.currentPost);
    };

    const getAttachment = async () => {
        const dataRes = await axiosPrivate.get(`/post/get-attachment/${dataPost.postId}`);
        setAttachment(dataRes.data.data);
    };

    useEffect(() => {
        getAttachment();
        getAllComment();
    }, []);

    useEffect(() => {
        getAttachment();
        getAllComment();
        setDataPost(data);
    }, [data]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('more-btn-wrapper')}>
                <Menu
                    arrow={false}
                    hideOnClick={true}
                    trigger={'click'}
                    placement="bottom-end"
                    delay={[50, 50]}
                    items={classData.role === 't' ? MENU_TEACHER_POST : MENU_STUDENT_POST}
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

            <div className={cx('content')}>
                <div className={cx('author')}>
                    <div className={cx('img-box')}>
                        <Images
                            alt="author-avatar"
                            src={dataPost?.avatar ? `http://localhost:8080${dataPost.avatar}` : images.noAvatar}
                        />
                    </div>
                    <div className={cx('author-infor')}>
                        <h2 className={cx('name')}>{dataPost?.fullName}</h2>
                        <p className={cx('time')}>{dataPost?.createdAt}</p>
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('body-content')} dangerouslySetInnerHTML={{ __html: dataPost?.content }}></div>
                    <div className={cx('body-attach', { row: true })}>
                        {attachment?.files &&
                            attachment.files.map((file, index) => {
                                return (
                                    <AttachItem
                                        key={index}
                                        type="file"
                                        className={cx('body-attach-item')}
                                        data={{ ...file, index: 1 }}
                                    />
                                );
                            })}
                        {attachment?.links &&
                            attachment.links.map((link, index) => {
                                return (
                                    <AttachItem
                                        key={index}
                                        type="link"
                                        className={cx('body-attach-item')}
                                        data={{ ...link, index: index }}
                                    />
                                );
                            })}

                        {/* <AttachItem
                            className={cx('body-attach-item')}
                            data={{ url: 'url-https', title: '', index: 1 }}
                        />
                        <AttachItem
                            className={cx('body-attach-item')}
                            data={{ url: 'url-https', title: '', index: 1 }}
                        /> */}
                    </div>
                    <CommentForm data={{ avatar: avatarUser }} handleSubmit={handleSubmitComment} />
                    <div
                        className={cx('body-comment-section', {
                            'show-more-cmt': showMoreCmt,
                            'no-comment': comments.length === 0,
                        })}
                    >
                        {comments.map((comment, index) => {
                            return (
                                <div key={index} className={cx('comment-item')}>
                                    <div className={cx('img-box')}>
                                        <Images
                                            alt="user-avatar"
                                            src={
                                                comment.avatar
                                                    ? `http://localhost:8080${comment.avatar}`
                                                    : images.noAvatar
                                            }
                                        />
                                    </div>
                                    <div className={cx('comment-item-body')}>
                                        <div className={cx('header')}>
                                            <h4 className={cx('fullname')}>{comment.fullName}</h4>
                                            <p className={cx('time')}>{comment.createdAt}</p>
                                        </div>
                                        <div className={cx('content')}>{comment.content}</div>
                                        {/* <Button text className={cx('btn-reply')}>
                                    Trả lời
                                </Button> */}
                                    </div>
                                </div>
                            );
                        })}
                        {comments.length > 0 ? (
                            showMoreCmt ? (
                                <Button
                                    onClick={() => setShowMoreCmt((prev) => !prev)}
                                    text
                                    className={cx('show-more-btn')}
                                    hidden
                                >
                                    Xem tất cả
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => setShowMoreCmt((prev) => !prev)}
                                    text
                                    className={cx('show-less-btn')}
                                >
                                    Thu gọn
                                </Button>
                            )
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
            <div className={cx('comment')}></div>

            <EditPost
                postData={data}
                setDataPost={setDataPost}
                setUpdateAttachment={setAttachment}
                classId={classData.classId}
                open={openEditPost}
                closeOnDocumentClick
                onClose={closeEditPost}
            />
            <ConfirmForm
                handleDeletePost={handleDeletePost}
                open={openConfirmForm}
                closeOnDocumentClick
                onClose={closeConfirmForm}
            />
        </div>
    );
}

export default PostItem;
