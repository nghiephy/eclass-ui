import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PostItem from './components/PostItem';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

import styles from './PostDetail.module.scss';
import SubmitForm from './components/SubmitForm';

const cx = classNames.bind(styles);

function PostDetail() {
    const { classId, postId, role, type } = useParams();
    const [postData, setPostData] = useState();
    const [choiceData, setChoiceData] = useState();
    const [attachment, setAttachment] = useState();
    const [comments, setComments] = useState([]);

    const axiosPrivate = useAxiosPrivate();

    const getExerciseData = async () => {
        const dataRes = await axiosPrivate.get(`/exercise/get-detail/${classId}/${postId}`);
        setPostData(dataRes.data.exercise);
    };

    const getMaterialData = async () => {
        const dataRes = await axiosPrivate.get(`/material/get-detail/${classId}/${postId}`);
        setPostData(dataRes.data.material);
    };

    const getQuestionData = async () => {
        const dataRes = await axiosPrivate.get(`/question/get-detail/${classId}/${postId}`);
        setPostData(dataRes.data.question);
        setChoiceData(dataRes.data?.answerList);
        console.log(dataRes);
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
    // console.log(choiceData);
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
                    attachment={attachment}
                    comments={comments}
                    handleSubmitComment={handleSubmitComment}
                    role={role}
                    choiceData={choiceData}
                />
            </div>
            {type === 'BT' && (
                <div className={cx('submit-container')}>
                    <SubmitForm />
                </div>
            )}
        </div>
    );
}

export default PostDetail;
