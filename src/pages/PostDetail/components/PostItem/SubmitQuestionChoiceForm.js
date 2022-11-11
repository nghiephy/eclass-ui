import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '~/components/Button';
import Inputs from '~/components/Inputs';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

import styles from './PostItem.module.scss';

const cx = classNames.bind(styles);

function SubmitQuestionChoiceForm({ choiceData, data, handleSubmitChoice, setIsChoiceCorrect, isCompleted, disabled }) {
    const axiosPrivate = useAxiosPrivate();
    const [answered, setAnswered] = useState('false');

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        handleSubmitChoice(data.answerChoice);
    };

    const getAnswer = async () => {
        const respone = await axiosPrivate.get(`/question/get-answer/${data.exerciseId}`);
        console.log(respone);
        setAnswered(respone.data.answerRes);
        setIsChoiceCorrect(respone.data.answerRes.correct === '1' ? 100 : 0);
    };

    useEffect(() => {
        if (isCompleted) {
            getAnswer();
        }
    }, [data]);

    return (
        <div className={cx('body-submit')}>
            <form className={cx('form-section')} onSubmit={handleSubmit(onSubmit)}>
                <div className={cx('choice-section')}>
                    {choiceData &&
                        choiceData.map((choice, index) => {
                            return (
                                <div
                                    key={index}
                                    className={cx('choice-item', {
                                        correct: answered.correct === '1' && answered.answerChoice === choice.answerId,
                                        wrong: answered.correct !== '1' && answered.answerChoice === choice.answerId,
                                    })}
                                >
                                    <input
                                        id={`choice${index}`}
                                        type="radio"
                                        value={choice.answerId}
                                        name="answer"
                                        disabled={isCompleted || disabled}
                                        checked={
                                            isCompleted || disabled ? answered.answerChoice === choice.answerId : true
                                        }
                                        className={cx('choice-radio')}
                                        {...register('answerChoice', {
                                            required: 'Chọn đáp án',
                                        })}
                                    />
                                    <label htmlFor={`choice${index}`}>{choice.content}</label>
                                </div>
                            );
                        })}
                </div>
                <Inputs
                    submit
                    className={cx('submit', { 'opacity-6': isCompleted || disabled })}
                    type="submit"
                    value={isCompleted ? 'Đã nộp' : 'Nộp bài'}
                    disabled={isCompleted || disabled}
                />
            </form>
        </div>
    );
}

export default SubmitQuestionChoiceForm;
