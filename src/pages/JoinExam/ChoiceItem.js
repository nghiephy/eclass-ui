import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Inputs from '~/components/Inputs';

import styles from './JoinExam.module.scss';

const cx = classNames.bind(styles);

function ChoiceItem({ dataChoices, indexQues, handleSetUserAnswers }) {
    const handleClickChoice = (data) => {
        console.log(data);
        handleSetUserAnswers(data);
    };
    return (
        <div>
            {dataChoices.map((choice, indexChoice) => {
                return (
                    <div
                        key={`${indexQues}${indexChoice}`}
                        className={cx('choice-item')}
                        onClick={() => {
                            handleClickChoice(choice);
                        }}
                    >
                        <input
                            type="radio"
                            value={indexChoice}
                            name={`correct_ans${indexQues}`}
                            id={`correct_ans${indexQues}${indexChoice}`}
                            className={cx('choice-radio')}
                        />
                        <label htmlFor={`correct_ans${indexQues}${indexChoice}`}>
                            <div className={cx('choice-content')}>{choice.content}</div>
                        </label>
                    </div>
                );
            })}
        </div>
    );
}

export default ChoiceItem;
