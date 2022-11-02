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
    const [showMoreCmt, setShowMoreCmt] = useState(true);
    const [attachment, setAttachment] = useState();
    const [comments, setComments] = useState([]);

    const handleOnChange = async (menuItem) => {
        console.log(menuItem);
    };

    const getAllComment = async () => {
        const allCommentRes = await axiosPrivate.get(`/comment/get-all`, {
            params: {
                postId: data.postId,
                classId: data.classId,
            },
        });
        console.log(allCommentRes);
        setComments(allCommentRes.data.allComment);
    };

    console.log(comments);

    const handleSubmitComment = async (comment) => {
        console.log('Comment', comment);
        const dataCommentRes = await axiosPrivate.post(`/comment/create`, {
            content: comment,
            postId: data.postId,
            classId: data.classId,
        });
        console.log(dataCommentRes);
        await getAllComment();
    };

    const getAttachment = async () => {
        const dataRes = await axiosPrivate.get(`/post/get-attachment/${data.postId}`);
        setAttachment(dataRes.data.data);
    };

    useEffect(() => {
        getAttachment();
        getAllComment();
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
                        <Images
                            alt="author-avatar"
                            src={data.avatar ? `http://localhost:8080${data.avatar}` : images.noAvatar}
                        />
                    </div>
                    <div className={cx('author-infor')}>
                        <h2 className={cx('name')}>{data.fullName}</h2>
                        <p className={cx('time')}>{data.createdAt}</p>
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('body-content')} dangerouslySetInnerHTML={{ __html: data.content }}></div>
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
                    <CommentForm data={{ avatar: data.avatar }} handleSubmit={handleSubmitComment} />
                    <div className={cx('body-comment-section', { 'show-more-cmt': showMoreCmt })}>
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
                        {showMoreCmt ? (
                            <Button
                                onClick={() => setShowMoreCmt((prev) => !prev)}
                                text
                                className={cx('show-more-btn')}
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
                        )}
                    </div>
                </div>
            </div>
            <div className={cx('comment')}></div>
        </div>
    );
}

export default PostItem;
