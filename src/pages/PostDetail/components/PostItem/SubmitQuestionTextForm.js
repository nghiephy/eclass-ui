import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import Button from '~/components/Button';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

import styles from './PostItem.module.scss';

const cx = classNames.bind(styles);

function SubmitQuestionTextForm({ handleSubmit, data }) {
    const axiosPrivate = useAxiosPrivate();
    const [answerText, setAnswerText] = useState('');
    const isDisabledSubBtn = answerText?.length === 0 || data.isCompleted === 1;

    const submitComment = () => {
        handleSubmit(answerText);
        setAnswerText('');
    };

    const getAnswer = async () => {
        const respone = await axiosPrivate.get(`/question/get-answer/${data.exerciseId}`);
        setAnswerText(respone.data.answerRes.answer);
    };

    useEffect(() => {
        if (data.isCompleted === 1) {
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
                readOnly={data.isCompleted === 1}
            />
            <Button primary disabled={isDisabledSubBtn} onClick={submitComment}>
                {data.isCompleted === 1 ? 'Đã nộp' : 'Nộp bài'}
            </Button>
        </div>
    );
}

export default SubmitQuestionTextForm;
