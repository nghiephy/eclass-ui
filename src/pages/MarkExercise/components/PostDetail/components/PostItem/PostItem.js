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
import useAuth from '~/hooks/useAuth';
import SubmitQuestionTextForm from './SubmitQuestionTextForm';
import SubmitQuestionChoiceForm from './SubmitQuestionChoiceForm';
import { useParams } from 'react-router-dom';
import AssignmentFilesBoard from './AssignmentFilesBoard';

const cx = classNames.bind(styles);

function PostItem({
    data,
    setData,
    attachment,
    setAttachment,
    choiceData,
    role,
    isCompleted,
    setIsCompleted,
    checkUserId,
}) {
    const { auth, classData } = useAuth();
    const { userId, type } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [isChoiceCorrect, setIsChoiceCorrect] = useState(0);

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

    console.log(type);

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

    return (
        <div className={cx('wrapper')}>
            {parseInt(auth.id) !== parseInt(userId) && (
                <span className={cx('status-completed', { correct: isCompleted, wrong: !isCompleted })}>
                    {isCompleted ? 'Đã nộp' : 'Chưa nộp'}
                </span>
            )}
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
                        <h3 className={cx('max-score')}>Điểm tối đa: {`${data?.maxScore}`}</h3>
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

                    {type === 'CH' ? (
                        data?.typeExe === 'question_text' ? (
                            <SubmitQuestionTextForm
                                handleSubmit={handleSubmitTextForm}
                                data={data}
                                isCompleted={isCompleted}
                                checkUserId={checkUserId}
                            />
                        ) : (
                            <SubmitQuestionChoiceForm
                                choiceData={choiceData}
                                handleSubmitChoice={handleSubmitChoiceForm}
                                data={data}
                                setIsChoiceCorrect={setIsChoiceCorrect}
                                isCompleted={isCompleted}
                                disabled={role === 't'}
                                checkUserId={checkUserId}
                            />
                        )
                    ) : (
                        <AssignmentFilesBoard
                            handleSubmit={handleSubmitTextForm}
                            data={data}
                            isCompleted={isCompleted}
                            checkUserId={checkUserId}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default PostItem;
