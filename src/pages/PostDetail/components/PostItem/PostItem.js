import classNames from 'classnames/bind';
import 'reactjs-popup/dist/index.css';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';
import moment from 'moment';

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
import SubmitQuestionTextForm from './SubmitQuestionTextForm';
import SubmitQuestionChoiceForm from './SubmitQuestionChoiceForm';
import EditAssignment from '~/pages/Exercise/components/Modals/EditAssignment';

const cx = classNames.bind(styles);

const MENU_TEACHER_POST = [
    {
        title: 'Chỉnh sửa',
        code: 'edit',
    },
    {
        title: 'Xoá',
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

function PostItem({
    data,
    setData,
    attachment,
    setAttachment,
    comments,
    handleSubmitComment,
    choiceData,
    role,
    isCompleted,
    setIsCompleted,
}) {
    const { auth, classData } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [showMoreCmt, setShowMoreCmt] = useState(true);
    const [isChoiceCorrect, setIsChoiceCorrect] = useState(0);

    const [actionHidden, setActionHidden] = useState(false);
    const [openUpdateAssignment, setOpenUpdateAssignment] = useState(false);
    const closeUpdateAssignment = () => setOpenUpdateAssignment(false);

    const toggleUpdateAssigment = () => {
        setOpenUpdateAssignment(!openUpdateAssignment);
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

    const handleOnChange = async (menuItem) => {
        if (menuItem.code === 'edit') {
            if (data?.type === 'BT') {
                toggleUpdateAssigment();
            }
        }
        setActionHidden((prev) => !prev);
    };

    const handleSubmitTextForm = async (answerText) => {
        try {
            const respone = await axiosPrivate.post(`/question/submit`, {
                postId: data.postId,
                exerciseId: data.exerciseId,
                answerText: answerText,
                typeExe: data.typeExe,
            });
            console.log(respone);
            setData(respone.data.submitRes);
            setIsCompleted(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitChoiceForm = async (answerChoice) => {
        try {
            const respone = await axiosPrivate.post(`/question/submit`, {
                postId: data.postId,
                exerciseId: data.exerciseId,
                answerChoice: answerChoice,
                typeExe: data.typeExe,
            });
            console.log(respone);
            setData(respone.data.submitRes);
            setIsCompleted(true);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(isCompleted);

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

            <div className={cx('content')}>
                <div className={cx('author')}>
                    <div className={cx('img-box')}>
                        <Images alt="author-avatar" src={icon} />
                    </div>
                    <div className={cx('author-infor')}>
                        <h2 className={cx('name')}>{data?.title}</h2>
                        <p className={cx('time')}>{moment(data?.createdAt).format('DD/MM/YYYY HH:mm:ss')}</p>
                    </div>
                </div>
                <div className={cx('post-infor')}>
                    {data?.type === 'BT' || data?.type === 'CH' ? (
                        <h3 className={cx('max-score')}>
                            Điểm: {`${data?.score || isChoiceCorrect} / ${data?.maxScore}`}
                        </h3>
                    ) : (
                        <div></div>
                    )}

                    <p className={cx('deadline')}>
                        {data?.deadline
                            ? `Hạn cuối: ${moment(data?.deadline).format('DD/MM/YYYY')}`
                            : 'Không có ngày đến hạn'}
                    </p>
                </div>
                <div className={cx('body')}>
                    <div className={cx('body-content')} dangerouslySetInnerHTML={{ __html: data?.guide }}></div>

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
                    </div>

                    {data?.type === 'CH' ? (
                        data?.typeExe === 'question_text' && classData.role === 'h' ? (
                            <SubmitQuestionTextForm
                                handleSubmit={handleSubmitTextForm}
                                data={data}
                                isCompleted={isCompleted}
                            />
                        ) : (
                            <SubmitQuestionChoiceForm
                                choiceData={choiceData}
                                handleSubmitChoice={handleSubmitChoiceForm}
                                data={data}
                                setIsChoiceCorrect={setIsChoiceCorrect}
                                isCompleted={isCompleted}
                                disabled={classData.role === 't'}
                            />
                        )
                    ) : (
                        <></>
                    )}

                    <CommentForm data={{ avatar: auth.avatar }} handleSubmit={handleSubmitComment} />
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

            <EditAssignment
                data={data}
                setData={setData}
                attachment={attachment}
                setAttachment={setAttachment}
                open={openUpdateAssignment}
                isOpen={openUpdateAssignment}
                closeOnDocumentClick
                onClose={closeUpdateAssignment}
            />
        </div>
    );
}

export default PostItem;
