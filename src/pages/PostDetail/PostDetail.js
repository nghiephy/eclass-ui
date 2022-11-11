import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PostItem from './components/PostItem';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useAuth from '~/hooks/useAuth';

import styles from './PostDetail.module.scss';
import SubmitForm from './components/SubmitForm';

const cx = classNames.bind(styles);

function PostDetail() {
    const { classData, auth } = useAuth();
    const { classId, postId, role, type } = useParams();
    const [postData, setPostData] = useState();
    const [choiceData, setChoiceData] = useState();
    const [attachment, setAttachment] = useState();
    const [comments, setComments] = useState([]);
    const [isCompleted, setIsCompleted] = useState();

    const axiosPrivate = useAxiosPrivate();

    const getExerciseData = async () => {
        const dataRes = await axiosPrivate.get(`/exercise/get-detail/${classId}/${postId}`);
        setPostData(dataRes.data.exercise);
        setIsCompleted(dataRes.data.checkCompletedRes);
        console.log(dataRes);
    };

    const getMaterialData = async () => {
        const dataRes = await axiosPrivate.get(`/material/get-detail/${classId}/${postId}`);
        setPostData(dataRes.data.material);
    };

    const getQuestionData = async () => {
        try {
            const dataRes = await axiosPrivate.get(`/question/get-detail/${classId}/${postId}`, {
                params: {
                    userId: auth.id,
                },
            });
            setPostData(dataRes.data.question);
            setChoiceData(dataRes.data?.answerList);
            setIsCompleted(dataRes.data.checkCompletedRes);
        } catch (error) {
            console.log(error);
        }
    };

    const getAttachment = async () => {
        const dataRes = await axiosPrivate.get(`/post/get-attachment/${postId}`);
        setAttachment(dataRes.data.data);
    };

    const getAllComment = async () => {
        const allCommentRes = await axiosPrivate.get(`/comment/get-all`, {
            params: {
                postId: postId,
                classId: classId,
            },
        });
        setComments(allCommentRes.data.allComment);
    };

    const handleSubmitComment = async (comment) => {
        console.log('Comment', comment);
        const dataCommentRes = await axiosPrivate.post(`/comment/create`, {
            content: comment,
            postId: postId,
            classId: classId,
        });
        await getAllComment();
    };

    console.log(postData);
    useEffect(() => {
        if (type === 'BT') {
            getExerciseData();
        }
        if (type === 'TL') {
            getMaterialData();
        }
        if (type === 'CH') {
            getQuestionData();
        }

        getAttachment();
        getAllComment();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('post-container')}>
                <PostItem
                    data={postData}
                    setData={setPostData}
                    attachment={attachment}
                    setAttachment={setAttachment}
                    comments={comments}
                    handleSubmitComment={handleSubmitComment}
                    role={role}
                    choiceData={choiceData}
                    isCompleted={isCompleted}
                    setIsCompleted={setIsCompleted}
                />
            </div>
            {type === 'BT' && classData.role === 'h' ? (
                <div className={cx('submit-container')}>
                    <SubmitForm
                        data={postData}
                        setPostData={setPostData}
                        isCompleted={isCompleted}
                        setIsCompleted={setIsCompleted}
                    />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default PostDetail;
