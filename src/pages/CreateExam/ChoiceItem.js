import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Inputs from '~/components/Inputs';

import styles from './CreateExam.module.scss';

const cx = classNames.bind(styles);

function ChoiceItem({ dataChoices, indexQues }) {
    return (
        <div>
            {dataChoices.map((choice, indexChoice) => {
                return (
                    <div key={`${indexQues}${indexChoice}`} className={cx('choice-item')}>
                        {choice.correct && (
                            <input
                                type="radio"
                                value={indexChoice}
                                name={`correct_ans${indexQues}`}
                                className={cx('choice-radio')}
                                defaultChecked={choice.correct}
                            />
                        )}

                        <Inputs
                            primary
                            name={`choice${indexQues}${indexChoice}`}
                            type="text"
                            label={`Lựa chọn ${indexChoice + 1}`}
                            value={choice.content}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default ChoiceItem;
