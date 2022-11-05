import classNames from 'classnames/bind';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '~/components/Button';
import Inputs from '~/components/Inputs';

import styles from './PostItem.module.scss';

const cx = classNames.bind(styles);

function SubmitQuestionChoiceForm({ choiceData }) {
    const [answerText, setCommentText] = useState('');
    const isDisabledSubBtn = answerText?.length === 0;

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
    };

    return (
        <div className={cx('body-submit')}>
            <form className={cx('form-section')} onSubmit={handleSubmit(onSubmit)}>
                <div className={cx('choice-section')}>
                    {choiceData &&
                        choiceData.map((choice, index) => {
                            return (
                                <div key={index} className={cx('choice-item')}>
                                    <input
                                        id={`choice${index}`}
                                        type="radio"
                                        value={index}
                                        name="answer"
                                        className={cx('choice-radio')}
                                        {...register('answer', {
                                            required: 'Chọn đáp án',
                                        })}
                                    />
                                    <label htmlFor={`choice${index}`}>{choice.content}</label>
                                </div>
                            );
                        })}
                </div>
                <Inputs submit className={cx('submit')} type="submit" value="Nộp bài" />
            </form>
        </div>
    );
}

export default SubmitQuestionChoiceForm;
