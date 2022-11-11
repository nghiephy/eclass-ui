import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import Button from '~/components/Button';

import styles from './ListItem.module.scss';

const cx = classNames.bind(styles);

function SubmitScoreForm({ handleSaveScore, handleEditScore, resultSubmit }) {
    const [score, setScore] = useState('');
    const isDisabledCmtBtn = score?.length === 0;

    const submitSave = () => {
        handleSaveScore(score);
        setScore('');
    };

    const submitEdit = () => {
        handleEditScore(score);
        setScore('');
    };

    useEffect(() => {
        if (resultSubmit.score !== null) setScore(resultSubmit.score);
    }, [resultSubmit]);

    return (
        <div className={cx('submit-section')}>
            <input
                className={cx('grade-input')}
                type="number"
                name="score"
                placeholder="Điểm"
                value={score}
                onChange={(e) => setScore(e.target.value)}
            />
            {resultSubmit?.score === null || resultSubmit === null ? (
                <Button className={cx('button-submit-grade')} primary disabled={isDisabledCmtBtn} onClick={submitSave}>
                    Lưu
                </Button>
            ) : (
                <Button className={cx('button-submit-grade')} primary disabled={isDisabledCmtBtn} onClick={submitEdit}>
                    Sửa
                </Button>
            )}
        </div>
    );
}

export default SubmitScoreForm;
