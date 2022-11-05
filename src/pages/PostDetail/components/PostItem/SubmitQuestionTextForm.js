import classNames from 'classnames/bind';
import { useState } from 'react';

import Button from '~/components/Button';

import styles from './PostItem.module.scss';

const cx = classNames.bind(styles);

function SubmitQuestionTextForm({ handleSubmit, data }) {
    const [answerText, setCommentText] = useState('');
    const isDisabledSubBtn = answerText?.length === 0;

    const submitComment = () => {
        handleSubmit(answerText);
        setCommentText('');
    };
    return (
        <div className={cx('body-submit')}>
            <textarea
                value={answerText}
                onChange={(e) => setCommentText(e.target.value)}
                className={cx('input-answer')}
                placeholder="Nhập câu trả lời của bạn ở đây"
            />
            <Button primary disabled={isDisabledSubBtn} onClick={submitComment}>
                Nộp bài
            </Button>
        </div>
    );
}

export default SubmitQuestionTextForm;
