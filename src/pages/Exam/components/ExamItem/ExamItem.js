import classNames from 'classnames/bind';
import 'reactjs-popup/dist/index.css';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';

import { MyIcon } from '~/components/MyIcons';
import { IcThreeDotsVertical } from '~/components/MyIcons/regular';
import Button from '~/components/Button';
import images from '~/assets/images';

import styles from './ExamItem.module.scss';
import Images from '~/components/Images';
import Menu from '~/components/Popover/Menu';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import useAuth from '~/hooks/useAuth';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import { JoinExam } from '../Modals';

const cx = classNames.bind(styles);

const MENU_TEACHER_POST = [
    {
        title: 'Sao chép liên kết',
        code: 'copy',
    },
    {
        title: 'Xoá',
        code: 'delete',
    },
];
const MENU_STUDENT_POST = [
    {
        title: 'Sao chép liên kết',
    },
    {
        title: 'Báo cáo',
    },
];

function ExamItem({ data, setExamData }) {
    const navigate = useNavigate();
    const { auth, classData } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [actionHidden, setActionHidden] = useState(false);
    const [joinExam, setJoinExam] = useState(false);
    const closeJoinExam = () => setJoinExam(false);

    const toggleJoinExam = () => {
        setJoinExam(!joinExam);
    };

    const handleRemoveExam = async () => {
        const response = await axiosPrivate.post(`/exam/delete`, {
            postId: data.postId,
        });
        alert('Xoá học bài thi thành công!');
        setExamData((prev) => {
            const newExamData = prev.filter((item) => item.postId !== data.postId);

            return [...newExamData];
        });
    };

    const handleOnChange = async (menuItem) => {
        if (menuItem.code === 'delete') {
            handleRemoveExam();
        }
        setActionHidden((prev) => !prev);
    };

    const handleClickExamItem = () => {
        if (auth.id === data.userId) {
            navigate(`/detail-exam/${data.postId}`);
        } else {
            toggleJoinExam();
        }
    };

    useEffect(() => {}, []);

    return (
        <div
            className={cx('wrapper', {
                completed: data?.score || data?.score === 0,
            })}
        >
            <div className={cx('more-btn-wrapper')}>
                <Menu
                    arrow={false}
                    hideOnClick={true}
                    trigger={'click'}
                    placement="bottom-end"
                    delay={[50, 50]}
                    items={classData.role === 't' ? MENU_TEACHER_POST : MENU_STUDENT_POST}
                    onChange={handleOnChange}
                    className={cx('menu-more', { hidden: actionHidden })}
                >
                    <Button
                        circle
                        className={cx('more-btn')}
                        onClick={() => {
                            setActionHidden(false);
                        }}
                    >
                        <MyIcon className={cx('more-icon')}>
                            <IcThreeDotsVertical />
                        </MyIcon>
                    </Button>
                </Menu>
            </div>

            <div className={cx('content')} onClick={handleClickExamItem}>
                <div className={cx('body-basic')}>
                    <div className={cx('type-question')}>
                        <div className={cx('img-box')}>
                            <Images alt="type question icon" src={images.examIcon} />
                        </div>
                    </div>
                    <div className={cx('body')}>
                        <div className={cx('body-content')}>
                            <h4 className={cx('title')}>{data.title}</h4>
                            <div className={cx('deadline-section')}>
                                <p className={cx('deadline')}>
                                    Ngày:&nbsp;&nbsp;&nbsp;&nbsp;
                                    {data?.createdAt ? moment(data.startedAt).format('DD/MM/YYYY') : 'Không rõ'}
                                </p>
                                <p className={cx('deadline')}>
                                    Giờ:&nbsp;&nbsp;&nbsp;&nbsp;
                                    {data?.createdAt ? moment(data.startedAt).format('HH:mm:ss') : 'Không rõ'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('body-more')}>
                    {data.status ? (
                        <>
                            <p className={cx('body-more-item', 'completed')}>Đã hoàn thành bài thi!</p>
                            <p className={cx('body-more-item')}>
                                Số điểm:&nbsp;&nbsp;<strong>{data.score}</strong>
                            </p>
                            <p className={cx('body-more-item')}>
                                Thời gian:&nbsp;&nbsp;
                                <strong>
                                    {moment(data.doStartedAt).diff(moment(data.doFinishedAt), 'minutes')}&nbsp;phút
                                </strong>
                            </p>
                        </>
                    ) : (
                        <div>
                            <p className={cx('body-more-item')}>
                                Thời gian:&nbsp;&nbsp;
                                <strong>
                                    {moment(data.finishedAt).diff(moment(data.startedAt), 'minutes')}&nbsp;phút
                                </strong>
                            </p>
                            <p className={cx('body-more-item')}>
                                Số câu hỏi:&nbsp;&nbsp;<strong>{data.totalQuestion}</strong>
                            </p>
                            <p className={cx('body-more-item')}>
                                Điểm tối đa:&nbsp;&nbsp;<strong>{data.maxScore}</strong>
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <JoinExam dataExam={data} open={joinExam} closeOnDocumentClick onClose={closeJoinExam} />
        </div>
    );
}

export default ExamItem;
