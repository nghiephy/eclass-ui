import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '~/components/Button';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useAuth from '~/hooks/useAuth';

import styles from './CreateExam.module.scss';
import { useForm } from 'react-hook-form';
import Inputs from '~/components/Inputs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment';
import { TextField } from '@mui/material';
import { EditQuestion } from './components/Modals';
import ChoiceItem from './ChoiceItem';
import Popup from 'reactjs-popup';

const cx = classNames.bind(styles);

const FILTER_LABEL = [
    {
        name: 'Thi thử',
        code: 't',
    },
    {
        name: 'Thi thật',
        code: 'h',
    },
];

function CreateExam() {
    const navigate = useNavigate();
    const { classData } = useAuth();
    const { postId } = useParams();
    const axiosPrivate = useAxiosPrivate();

    const [guide, setGuide] = useState();
    const [title, setTitle] = useState();
    const [password, setPassword] = useState();
    const [totalScore, setTotalScore] = useState();
    const [duration, setDuration] = useState();
    const [detailExam, setDetailExam] = useState({});
    const [numChoice, setNumChocie] = useState(0);
    const [totalChoice, setTotalChoice] = useState([]);
    const [currentUpdateQuestion, setCurrentUpdateQuestion] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState([]);
    const [openUpdateQuestion, setOpenUpdateQuestion] = useState(false);
    const closeUpdateQuestion = () => setOpenUpdateQuestion(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const closeModalSuccess = () => setOpenSuccess(false);

    const [value, setValue] = useState(moment().format('MM/DD/YYYY'));

    const toggleUpdateQuestion = () => {
        setOpenUpdateQuestion(!openUpdateQuestion);
    };
    const toggleOpenSuccess = () => {
        setOpenSuccess(!openSuccess);
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue: setFormValue,
    } = useForm();

    const {
        register: registerPost,
        reset: resetPost,
        formState: { errors: errorsPost },
        handleSubmit: handleSubmitPost,
    } = useForm();

    const onSubmit = async (data) => {
        console.log(guide);
        const createExamRes = await axiosPrivate.post(`/exam/create`, {
            ...data,
            time: value,
            guide: guide,
            classId: classData.classId,
            questionList: currentQuestion,
        });
        console.log(createExamRes);
        toggleOpenSuccess();
        navigate(`/exam`);
    };

    const onSubmitPost = async (data) => {
        console.log(data);
        setCurrentQuestion((prev) => {
            const answerList = [];
            for (let i = 0; i < totalChoice.length; i++) {
                answerList.push({
                    content: data[`choice${i}`],
                    correct: parseInt(data.correct_ans) === i,
                });
            }
            const newCurrQuestions = [...prev];
            newCurrQuestions.push({
                questionName: data.question_name,
                answerList: answerList,
            });
            return newCurrQuestions;
        });
        setNumChocie(0);
        setTotalChoice([]);
    };

    console.log(currentQuestion);

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    const handleAddQuantityChocie = () => {
        setTotalChoice((prev) => [...prev, numChoice]);
        setNumChocie((prev) => prev + 1);
    };
    const handleDeleteChoice = (item) => {
        const newTotalChoice = totalChoice.filter((i) => i !== item);
        setTotalChoice(newTotalChoice);
    };
    const handleDeleteQuestion = (index) => {
        let newCurrQuestions = currentQuestion;
        newCurrQuestions.splice(index, 1);
        setCurrentQuestion([...newCurrQuestions]);
    };
    const handleEditQuestion = (index) => {
        const updateQuestion = { ...currentQuestion[index] };
        updateQuestion.index = index;
        setCurrentUpdateQuestion(updateQuestion);
        toggleUpdateQuestion();
    };
    const handleDataAfterUpdate = (data) => {
        setCurrentQuestion((prev) => {
            const newGG = [...prev];
            console.log(prev[data.index].questionName);
            newGG[data.index].questionName = data.questionname;
            newGG[data.index].answerList = [...data.newAnswerList];

            return newGG;
        });
    };

    const getDataDetailExam = async (postId) => {
        const res = await axiosPrivate.get(`/exam/detail/${postId}`);
        const examData = res.data.data;
        const questionList = res.data.questionListRes;
        console.log(res);

        setGuide(examData.guide);
        setDuration(moment(examData.finishedAt).diff(moment(examData.startedAt), 'minutes'));
        setTotalScore(examData.maxScore);
        setPassword(examData.password);
        setTitle(examData.title);
        setValue(moment(examData.deadline).format('DD/MM/YYYY HH:mm:ss'));

        const detailCurrentQuestion = questionList.map((question) => {
            return {
                questionName: question.question,
                answerList: question.Exam_Answers,
            };
        });

        setCurrentQuestion(detailCurrentQuestion);
    };

    const handleUpdateExam = async () => {
        const dataUpdate = {
            postId: postId,
            title: title,
            totalScore: totalScore,
            duration: duration,
            password: password,
            time: value,
            guide: guide,
            classId: classData.classId,
            questionList: currentQuestion,
        };
        console.log(dataUpdate);
        const updateRes = await axiosPrivate.post(`/exam/update`, dataUpdate);
        console.log(updateRes);
    };

    useEffect(() => {
        resetPost({ question_name: '' });
    }, [currentQuestion]);

    useEffect(() => {
        console.log(postId);
        if (postId) {
            getDataDetailExam(postId);
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('annouce-board')}>
                    <h2 className={cx('title')}>Thông tin đề thi</h2>
                    <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
                        <Inputs
                            primary
                            name="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            register={register}
                            label="Tên bài thi"
                            validate={{
                                required: 'Chưa nhập tên bài thi',
                            }}
                            errors={errors}
                            className={cx('input-item')}
                        />
                        <textarea
                            name="guide"
                            className={cx('guide-textarea')}
                            placeholder="Hướng dẫn làm bài"
                            value={guide}
                            onChange={(e) => setGuide(e.target.value)}
                        ></textarea>
                        <Inputs
                            primary
                            name="totalScore"
                            type="number"
                            value={totalScore}
                            onChange={(e) => setTotalScore(e.target.value)}
                            register={register}
                            label="Tổng điểm"
                            validate={{
                                required: 'Chưa nhập tổng điểm',
                            }}
                            errors={errors}
                            className={cx('input-item')}
                        />
                        <Inputs
                            primary
                            name="duration"
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            register={register}
                            label="Thời gian thi (phút)"
                            validate={{
                                required: 'Chưa nhập thời gian thi',
                            }}
                            errors={errors}
                            className={cx('input-item')}
                        />
                        <Inputs
                            primary
                            name="passwordExam"
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            register={register}
                            label="Mật khẩu"
                            validate={{
                                required: 'Chưa nhập mật khẩu',
                            }}
                            errors={errors}
                            className={cx('input-item')}
                        />
                        <div className={cx('deadline-picker')}>
                            <h3 className={cx('title-input')}>Ngày giờ thi: </h3>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    inputFormat="DD/MM/YYYY HH:mm"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} className={cx('deadline-input')} />}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className={cx('form-actions')}>
                            {postId ? (
                                <Button
                                    primary
                                    className={cx('update-btn')}
                                    id="update-form"
                                    onClick={() => {
                                        handleUpdateExam();
                                    }}
                                >
                                    Cập Nhật
                                </Button>
                            ) : (
                                <Inputs
                                    submit
                                    className={cx('login')}
                                    id="submit-form"
                                    type="submit"
                                    value="Tạo đề thi"
                                />
                            )}
                        </div>
                    </form>
                </div>
                <div className={cx('timeline')}>
                    <div className={cx('add-question-section')}>
                        <h2 className={cx('timeline-title')}>Câu hỏi</h2>
                        <form className={cx('form-post')} onSubmit={handleSubmitPost(onSubmitPost)}>
                            <Inputs
                                primary
                                name="question_name"
                                type="text"
                                label="Câu hỏi (*)"
                                autoComplete="off"
                                register={registerPost}
                                validate={{
                                    required: 'Chưa nhập câu hỏi',
                                }}
                                errors={errorsPost}
                            />
                            <Button outline className={cx('add-choice-btn')} onClick={handleAddQuantityChocie}>
                                Thêm lựa chọn
                            </Button>
                            {totalChoice.map((item, i) => {
                                return (
                                    <div key={i + item} className={cx('choice-item')}>
                                        <input
                                            type="radio"
                                            value={i}
                                            name="correct_ans"
                                            className={cx('choice-radio')}
                                            {...registerPost('correct_ans', {
                                                required: 'Chọn đáp án đúng',
                                            })}
                                        />

                                        <Inputs
                                            primary
                                            name={`choice${i}`}
                                            type="text"
                                            label={`Lựa chọn ${i + 1}`}
                                            register={registerPost}
                                            validate={{
                                                required: 'Chưa nhập câu trả lời',
                                            }}
                                            errors={errorsPost}
                                        />
                                        <span className={cx('choice-delete')} onClick={() => handleDeleteChoice(item)}>
                                            &times;
                                        </span>
                                    </div>
                                );
                            })}
                            <div className={cx('form-actions')}>
                                <Inputs
                                    submit
                                    className={cx('login')}
                                    id="submit-form-post"
                                    type="submit"
                                    value="Thêm câu hỏi"
                                />
                            </div>
                        </form>
                    </div>
                    {currentQuestion.map((question, index) => {
                        return (
                            <div key={index} className={cx('question')}>
                                <span className={cx('question-delete')} onClick={() => handleDeleteQuestion(index)}>
                                    &times;
                                </span>
                                <span className={cx('question-edit')} onClick={() => handleEditQuestion(index)}>
                                    Sửa
                                </span>
                                <div className={cx('num-question')}>{`Câu ${index + 1}`}</div>
                                <div className={cx('body-content')}>{question.questionName}</div>
                                {/* {question.answerList.map((choice, i) => {
                                    return <ChoiceItem dataChoice={choice} indexQues={index} indexChoice={i} />;
                                })} */}
                                <ChoiceItem dataChoices={[...question.answerList]} indexQues={index} />
                            </div>
                        );
                    })}
                </div>
            </div>

            {openUpdateQuestion && (
                <EditQuestion
                    open={openUpdateQuestion}
                    closeOnDocumentClick
                    onClose={closeUpdateQuestion}
                    data={{ ...currentUpdateQuestion }}
                    dataOrigin={Object.assign({}, currentUpdateQuestion)}
                    setCurrentQuestion={setCurrentQuestion}
                    handleDataAfterUpdate={handleDataAfterUpdate}
                />
            )}

            <Popup onClose={closeModalSuccess} closeOnDocumentClick open={openSuccess}>
                <div className={cx('modal')}>
                    <div className={cx('title')} style={{ fontWeight: 500, textAlign: 'center', marginBottom: '15px' }}>
                        {' '}
                        Đã tạo bài thi thành công!{' '}
                    </div>
                    <div className={cx('sub-title')} style={{ textAlign: 'center' }}>
                        Vui lòng kiểm tra lại thông tin! Bài thi có thể được chỉnh sửa ở mục Bài Thi! <br />
                    </div>
                    <div className={cx('form-actions')}>
                        <Button primary className={cx('cancel')} style={{ margin: '0 auto' }}>
                            Đã hiểu
                        </Button>
                    </div>
                </div>
            </Popup>
        </div>
    );
}

export default CreateExam;
