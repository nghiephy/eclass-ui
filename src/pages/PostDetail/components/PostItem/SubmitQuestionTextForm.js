import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import Button from '~/components/Button';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

import styles from './PostItem.module.scss';

const cx = classNames.bind(styles);

function SubmitQuestionTextForm({ handleSubmit, data, isCompleted }) {
    const axiosPrivate = useAxiosPrivate();
    const [answerText, setAnswerText] = useState('');
    const isDisabledSubBtn = answerText?.length === 0 || isCompleted !== null;

    const submitComment = () => {
        handleSubmit(answerText);
        setAnswerText('');
    };

    console.log(isCompleted);

    const getAnswer = async () => {
        const respone = await axiosPrivate.get(`/question/get-answer/${data.exerciseId}`);
        setAnswerText(respone.data.answerRes.answer);
    };

    useEffect(() => {
        if (isCompleted) {
            getAnswer();
        }
    }, [data]);
    return (
        <div className={cx('body-submit')}>
            <textarea
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                className={cx('input-answer')}
                placeholder="Nhập câu trả lời của bạn ở đây"
                readOnly={isCompleted}
            />
            <Button primary disabled={isDisabledSubBtn} onClick={submitComment}>
                {isCompleted ? 'Đã nộp' : 'Nộp bài'}
            </Button>
        </div>
    );
}

export default SubmitQuestionTextForm;
