import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '~/components/Button';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useAuth from '~/hooks/useAuth';

import styles from './Exam.module.scss';
import ExamItem from './components/ExamItem';

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

function Exam() {
    const navigate = useNavigate();
    const { classData } = useAuth();
    const { filter } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [examData, setExamData] = useState([]);

    const getAllExamData = async () => {
        const allExamsRes = await axiosPrivate.get(`/exam/get-all/${classData.classId}`);
        console.log(allExamsRes);
        setExamData(allExamsRes.data.data);
    };

    const handleClickCreatBtn = () => {
        navigate(`/create-exam`);
    };

    useEffect(() => {
        getAllExamData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('annouce-board')}>
                    <Button
                        primary
                        className={cx('create-exam-btn')}
                        onClick={() => {
                            handleClickCreatBtn();
                        }}
                    >
                        Tạo Đề Thi
                    </Button>
                </div>
                <div className={cx('timeline')}>
                    {filter !== 'h' && (
                        <div>
                            <h1 className={cx('timeline-title')}>Đề thi</h1>
                            {examData?.map((exam, index) => {
                                return <ExamItem key={index} data={exam} setExamData={setExamData} />;
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Exam;
