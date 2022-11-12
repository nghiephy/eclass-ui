import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import ListItem from './components/ListItem';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

import styles from './MarkExercise.module.scss';
import { useParams } from 'react-router-dom';
import PostDetail from './components/PostDetail';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);

function MarkExercise() {
    const { classData } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const { postId, userId, type } = useParams();
    const [studentList, setStudentList] = useState([]);
    const [resultSubmit, setResultSubmit] = useState();

    const getStudentList = async () => {
        const studentRes = await axiosPrivate.get(`/exercise/get-member-submit/${classData.classId}/${postId}`);
        console.log(studentRes);
        setStudentList(studentRes.data.memberSubmit);
    };

    const getResultSubmit = async () => {
        try {
            const resultSubmitRes = await axiosPrivate.get(`/exercise/get-result-submit/${postId}`, {
                params: {
                    userId: userId,
                },
            });
            setResultSubmit(resultSubmitRes.data.resultSubmit);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveScore = async (score) => {
        const markResponse = await axiosPrivate.post('/exercise/mark-exercise', {
            submitId: resultSubmit?.submitId,
            postId: postId,
            score: score,
            comment: '',
            userId: userId,
        });
        console.log(markResponse);
        getStudentList();
    };

    const handleEditScore = async (score) => {
        const udpateRes = await axiosPrivate.post('/exercise/update-mark-exercise', {
            postId: postId,
            score: score,
            comment: '',
            userId: userId,
        });
        console.log(udpateRes);
        getStudentList();
    };

    useEffect(() => {
        getStudentList();
    }, []);

    useEffect(() => {
        getResultSubmit();
    }, [userId]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('actions-section')}></div>
            <div className={cx('container')}>
                <div className={cx('annouce-board')}>
                    <ListItem
                        title="Danh sách học sinh"
                        data={studentList}
                        resultSubmit={resultSubmit}
                        handleSaveScore={handleSaveScore}
                        handleEditScore={handleEditScore}
                    />
                </div>
                <div className={cx('timeline')}>
                    <PostDetail />
                </div>
            </div>
        </div>
    );
}

export default MarkExercise;
