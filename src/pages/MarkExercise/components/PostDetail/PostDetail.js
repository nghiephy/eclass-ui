import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PostItem from './components/PostItem';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useAuth from '~/hooks/useAuth';

import styles from './PostDetail.module.scss';

const cx = classNames.bind(styles);

function PostDetail({}) {
    const { classData, auth } = useAuth();
    const { postId, userId, type } = useParams();
    const [postData, setPostData] = useState();
    const [choiceData, setChoiceData] = useState();
    const [attachment, setAttachment] = useState();
    const [isCompleted, setIsCompleted] = useState();

    const axiosPrivate = useAxiosPrivate();

    const getExerciseData = async () => {
        const dataRes = await axiosPrivate.get(`/exercise/get-detail/${classData.classId}/${postId}`, {
            params: {
                userId: userId,
            },
        });
        setPostData(dataRes.data.exercise);
        setIsCompleted(dataRes.data.checkCompletedRes);
    };

    const getQuestionData = async () => {
        const dataRes = await axiosPrivate.get(`/question/get-detail/${classData.classId}/${postId}`, {
            params: {
                userId: userId,
            },
        });
        setPostData(dataRes.data.question);
        setChoiceData(dataRes.data?.answerList);
        setIsCompleted(dataRes.data.checkCompletedRes);
    };

    const getAttachment = async () => {
        const dataRes = await axiosPrivate.get(`/post/get-attachment/${postId}`);
        setAttachment(dataRes.data.data);
    };

    console.log(postData);

    useEffect(() => {
        if (type === 'BT') {
            getExerciseData();
        }
        if (type === 'CH') {
            getQuestionData();
        }

        getAttachment();
    }, [userId]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('post-container')}>
                <PostItem
                    data={postData}
                    setData={setPostData}
                    attachment={attachment}
                    setAttachment={setAttachment}
                    role={parseInt(userId) === auth.id ? 't' : 'h'}
                    choiceData={choiceData}
                    isCompleted={isCompleted}
                    setIsCompleted={setIsCompleted}
                    checkUserId={userId}
                />
            </div>
        </div>
    );
}

export default PostDetail;
