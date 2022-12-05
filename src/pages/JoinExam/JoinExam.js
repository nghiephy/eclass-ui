import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Countdown from 'react-countdown';

import Button from '~/components/Button';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useAuth from '~/hooks/useAuth';

import styles from './JoinExam.module.scss';
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

function JoinExam() {
    const navigate = useNavigate();
    const { classData } = useAuth();
    const { postId, takeId } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const startDate = useRef(Date.now());
    const timeDoExam = useRef(0);

    const [guide, setGuide] = useState();
    const [title, setTitle] = useState();
    const [totalScore, setTotalScore] = useState();
    const [duration, setDuration] = useState();
    const [userAnswers, setUserAnswers] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState([]);
    const [openSuccess, setOpenSuccess] = useState(false);
    const closeModalSuccess = () => setOpenSuccess(false);

    const [value, setValue] = useState(moment().format('MM/DD/YYYY'));

    const toggleOpenSuccess = () => {
        setOpenSuccess(!openSuccess);
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        let numCorrect = 0;
        const answerList = userAnswers.map((answer, index) => {
            if (answer.correct === true) numCorrect++;

            return {
                exquesId: answer.exquesId,
                exanswerId: answer.exanswerId,
            };
        });
        const score = (numCorrect / currentQuestion.length) * totalScore;

        const updateRes = await axiosPrivate.post(`/exam/update-result`, {
            answerList: answerList,
            dataUpdate: {
                takeId: takeId,
                score: score,
                timeDone: timeDoExam.current,
            },
        });

        console.log(updateRes);

        console.log('score', takeId);
        console.log(timeDoExam.current);
    };

    const handleSetUserAnswers = (data) => {
        console.log(data);
        let indexQues = null;
        const hasIndex = userAnswers.find((item, index) => {
            indexQues = index;
            return item.exquesId === data.exquesId;
        });
        let newUserAnswers = [...userAnswers];
        console.log(hasIndex);
        console.log(newUserAnswers);
        if (!hasIndex) {
            newUserAnswers.push({
                exquesId: data.exquesId,
                examId: data.examId,
                exanswerId: data.id,
                correct: data.correct,
            });
        } else {
            newUserAnswers[indexQues].exanswerId = data.id;
            newUserAnswers[indexQues].correct = data.correct;
        }
        setUserAnswers(newUserAnswers);
    };

    console.log(userAnswers);

    const getDataDetailExam = async (postId) => {
        const res = await axiosPrivate.get(`/exam/detail/${postId}`);
        const examData = res.data.data;
        const questionList = res.data.questionListRes;
        console.log(res);

        setGuide(examData.guide);
        setDuration(moment(examData.finishedAt).diff(moment(examData.startedAt), 'minutes'));
        setTotalScore(examData.maxScore);
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

    // Random component
    const Completionist = ({ total }) => <span>{total}</span>;

    // Renderer callback with condition
    const renderer = ({ total, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Completionist total={total} />;
        } else {
            // Render a countdown
            return (
                <span>
                    {hours}:{minutes}:{seconds}
                </span>
            );
        }
    };

    const handleOnTick = () => {
        timeDoExam.current++;
    };

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
                            label="Tên bài thi"
                            disabled
                            className={cx('input-item')}
                        />
                        <textarea
                            name="guide"
                            className={cx('guide-textarea')}
                            placeholder="Hướng dẫn làm bài"
                            value={guide}
                            disabled
                        ></textarea>
                        <Inputs
                            primary
                            name="totalScore"
                            type="number"
                            value={totalScore}
                            label="Tổng điểm"
                            disabled
                            className={cx('input-item')}
                        />
                        <Inputs
                            primary
                            name="duration"
                            type="number"
                            value={duration}
                            disabled
                            label="Thời gian thi (phút)"
                            className={cx('input-item')}
                        />
                        <div className={cx('time-remain')}>
                            <h3>Thời gian còn lại:</h3>
                            {duration && (
                                <Countdown
                                    date={startDate.current + duration * 60 * 1000}
                                    renderer={renderer}
                                    onTick={handleOnTick}
                                ></Countdown>
                            )}
                        </div>
                        <div className={cx('form-actions')}>
                            <Inputs submit className={cx('login')} id="submit-form" type="submit" value="Nộp bài" />
                        </div>
                    </form>
                </div>
                <div className={cx('timeline')}>
                    {currentQuestion.map((question, index) => {
                        return (
                            <div key={index} className={cx('question')}>
                                <div className={cx('num-question')}>{`Câu ${index + 1}`}</div>
                                <div className={cx('body-content')}>{question.questionName}</div>
                                {/* {question.answerList.map((choice, i) => {
                                    return <ChoiceItem dataChoice={choice} indexQues={index} indexChoice={i} />;
                                })} */}
                                <ChoiceItem
                                    dataChoices={[...question.answerList]}
                                    indexQues={index}
                                    handleSetUserAnswers={handleSetUserAnswers}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

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

export default JoinExam;
