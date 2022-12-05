import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from '~/components/Button';
import Inputs from '~/components/Inputs';

import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import styles from './EditQuestion.module.scss';

const cx = classNames.bind(styles);

function EditQuestion({ onClose, data, setCurrentQuestion, handleDataAfterUpdate, ...props }) {
    const [isUpdate, setIsUpdate] = useState(false);
    const [questionName, setQuestionName] = useState(data.questionName);
    const [updateAnswers, setUpdateAnswers] = useState([...data.answerList]);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const axiosPrivate = useAxiosPrivate();

    const [openSuccess, setOpenSuccess] = useState(false);
    const closeModalSuccess = () => setOpenSuccess(false);

    const handleOnClose = () => {
        onClose();
    };

    const onSubmit = (dataSubmit) => {
        console.log(dataSubmit);
        const newAnswerList = [];
        for (let i = 0; i < updateAnswers.length; i++) {
            newAnswerList.push({
                index: i,
                content: dataSubmit[`choice${i}`],
                correct: parseInt(dataSubmit.correct_ans) === i,
            });
        }
        console.log(newAnswerList);
        handleDataAfterUpdate({
            index: data.index,
            questionname: dataSubmit.questionname,
            newAnswerList: newAnswerList,
        });
        handleOnClose();
    };

    const handleDeleteChoice = (index) => {
        setUpdateAnswers((prev) => {
            prev.splice(index, 1);
            return [...prev];
        });
    };

    const setChoiceValue = (newValue, indexChoice) => {
        setUpdateAnswers((prev) => {
            const newAnswerList = [...prev];
            newAnswerList[indexChoice].content = newValue;
            newAnswerList[indexChoice].correct = true;
            return [...newAnswerList];
        });
    };

    const handleAddQuantityChocie = () => {
        setUpdateAnswers((prev) => {
            const newAnswerList = [...prev];
            newAnswerList.push({
                content: '',
                correct: false,
            });
            return [...newAnswerList];
        });
    };

    return (
        <div>
            <Popup className={cx('wrapper')} {...props} onClose={handleOnClose} style={{ borderRadius: '10px' }}>
                <div className={cx('modal')}>
                    <span className={cx('exits')} onClick={handleOnClose}>
                        &times;
                    </span>
                    <h2 className={cx('title')}>Chỉnh sửa nội dung câu hỏi</h2>
                    <p className={cx('sub-title')}>Vui lòng nhập thông tin chỉnh sửa vào form bên dưới</p>

                    <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
                        <Inputs
                            primary
                            name="questionname"
                            type="text"
                            value={questionName}
                            onChange={(event) => setQuestionName(event.target.value)}
                            label="Câu hỏi (*)"
                            register={register}
                            validate={{
                                required: 'Chưa nhập lại tên khoá học',
                            }}
                            errors={errors}
                            className={cx('questionname')}
                        />

                        <Button outline className={cx('add-choice-btn')} onClick={handleAddQuantityChocie}>
                            Thêm lựa chọn
                        </Button>

                        {updateAnswers &&
                            updateAnswers.map((choice, i) => {
                                return (
                                    <div key={i} className={cx('choice-item')}>
                                        <input
                                            type="radio"
                                            value={i}
                                            name={`correct_ans}`}
                                            className={cx('choice-radio')}
                                            defaultChecked={choice.correct}
                                            {...register(`correct_ans`, {
                                                required: 'Chọn đáp án đúng',
                                            })}
                                        />

                                        <Inputs
                                            primary
                                            name={`choice${i}`}
                                            type="text"
                                            label={`Lựa chọn ${i + 1}`}
                                            value={choice.content}
                                            onChange={(event) => setChoiceValue(event.target.value, i)}
                                            register={register}
                                            validate={{
                                                required: 'Chưa nhập câu trả lời',
                                            }}
                                            errors={errors}
                                        />
                                        <span className={cx('choice-delete')} onClick={() => handleDeleteChoice(i)}>
                                            &times;
                                        </span>
                                    </div>
                                );
                            })}

                        <div className={cx('form-actions')}>
                            <Button outline className={cx('cancel')} onClick={handleOnClose}>
                                Huỷ
                            </Button>
                            <Inputs submit className={cx('create')} type="submit" value="Cập Nhật" />
                        </div>
                    </form>
                </div>
            </Popup>
            <Popup onClose={closeModalSuccess} closeOnDocumentClick open={openSuccess}>
                <div className={cx('modal')}>
                    <div className={cx('title')} style={{ fontWeight: 500, textAlign: 'center', marginBottom: '15px' }}>
                        {' '}
                        Chỉnh sửa thông tin lớp học thành công!{' '}
                    </div>
                    <div className={cx('sub-title')} style={{ textAlign: 'center' }}>
                        Ảnh bìa lớp học có thể được đổi ở giao diện lớp học! <br />
                    </div>
                    <div className={cx('form-actions')}>
                        <Button primary className={cx('cancel')} style={{ margin: '0 auto' }}>
                            Đã hiểu
                        </Button>
                    </div>
                </div>
            </Popup>
            ;
        </div>
    );
}

export default EditQuestion;
