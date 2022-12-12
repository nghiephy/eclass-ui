import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import Button from '~/components/Button';
import Menu from '~/components/Popover/Menu';
import ListItem from './components/ListItem';
import Assignment, { Topic } from './components/Modals';
import Material from './components/Modals/Material';
import Question from './components/Modals/Question';
import PostItem from './components/PostItem';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

import styles from './Exercise.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import Select from '~/components/Select';
import useAuth from '~/hooks/useAuth';
import Popup from 'reactjs-popup';
import UpdateTopic from './components/Modals/UpdateTopic';

const cx = classNames.bind(styles);

const MENU_ACTIONS = [
    {
        title: 'Bài tập',
        code: 'assignment',
    },
    {
        title: 'Câu hỏi trắc nghiệm',
    },
    {
        title: 'Câu hỏi ngắn',
        code: 'question',
    },
    {
        title: 'Tài liệu',
        code: 'material',
    },
    {
        title: 'Chủ đề',
        code: 'topic',
    },
];

function Exercise() {
    const navigate = useNavigate();
    const { classData } = useAuth();
    const [currentTopic, setCurrentTopic] = useState();
    const [actionHidden, setActionHidden] = useState(false);
    const [openAssignment, setOpenAssignment] = useState(false);
    const closeAssignment = () => setOpenAssignment(false);
    const [openCreateTopic, setOpenCreateTopic] = useState(false);
    const closeCreateTopic = () => setOpenCreateTopic(false);
    const [openMaterial, setOpenMaterial] = useState(false);
    const closeMaterial = () => setOpenMaterial(false);
    const [openQuestion, setOpenQuestion] = useState(false);
    const closeQuestion = () => setOpenQuestion(false);
    const [openUpdateTopic, setOpenUpdateTopic] = useState(false);
    const closeUpdateTopic = () => setOpenUpdateTopic(false);

    const axiosPrivate = useAxiosPrivate();
    const { role, classId, topic } = useParams();

    const [topics, setTopics] = useState([]);
    const [exercises, setExercises] = useState([]);

    const toggleAssigment = () => {
        setOpenAssignment(!openAssignment);
    };
    const toggleCreateTopic = () => {
        setOpenCreateTopic(!openCreateTopic);
    };
    const toggleMaterial = () => {
        setOpenMaterial(!openMaterial);
    };
    const toggleQuestion = () => {
        setOpenQuestion(!openQuestion);
    };

    const togglesetOpenUpdateTopic = (topic) => {
        setOpenUpdateTopic(!openUpdateTopic);
        setCurrentTopic(parseInt(topic));
    };
    console.log(exercises);

    const handleOnChange = async (menuItem) => {
        if (menuItem.code === 'assignment') {
            toggleAssigment();
        }
        if (menuItem.code === 'topic') {
            toggleCreateTopic();
        }
        if (menuItem.code === 'material') {
            toggleMaterial();
        }
        if (menuItem.code === 'question') {
            toggleQuestion();
        }
        setActionHidden((prev) => !prev);
    };

    const getTopic = async () => {
        const topicRes = await axiosPrivate.get(`/topic/get-topics/${classId}`);

        setTopics((prev) => [
            {
                name: 'Tất cả',
                topicId: 0,
            },
            ...topicRes.data.topics,
        ]);
    };
    const getAllExercise = async () => {
        try {
            const exerciseRes = await axiosPrivate.get(`/exercise/get-all/${classId}`, {
                params: {
                    role: role === 't' ? 'GV' : 'HS',
                },
            });
            setExercises(exerciseRes.data.exercises);
        } catch (error) {
            console.log(error);
            if (error.response.data.code === 'unauthorized') {
                navigate(`/unauthorized`);
            }
        }
    };

    const getExeViaTopic = async () => {
        const exerciseRes = await axiosPrivate.get(`/exercise/get-all/${classId}/${topic}`);

        setExercises(exerciseRes.data.exercises);
    };

    const handleSelectType = (topicId) => {
        navigate(`/exercise/${classData.role}/${classData.classId}${topicId !== 0 ? `/${topicId}` : '/0'}`);
    };

    const handleUpdateTopic = () => {
        togglesetOpenUpdateTopic();
    };

    useEffect(() => {
        getTopic();
        getAllExercise();
    }, []);

    useEffect(() => {
        // getTopic();
        if (topic === '0') {
            getAllExercise();
        } else {
            getExeViaTopic();
        }
    }, [topic]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('actions-section')}>
                {topic === '0' && role === 't' ? (
                    <Menu
                        arrow={false}
                        hideOnClick={true}
                        trigger={'click'}
                        placement="bottom-end"
                        delay={[50, 50]}
                        items={MENU_ACTIONS}
                        onChange={handleOnChange}
                        className={cx('menu-more', { hidden: actionHidden })}
                    >
                        <Button
                            primary
                            className={cx('post-exercise-btn')}
                            onClick={() => {
                                setActionHidden(false);
                            }}
                        >
                            Tạo mới
                        </Button>
                    </Menu>
                ) : (
                    <div className={cx('title-topic')}>
                        <h2>{topics[parseInt(topic)]?.name}</h2>
                        <span className={cx('edit-topic')} onClick={() => handleUpdateTopic(parseInt(topic))}>
                            Sửa
                        </span>
                    </div>
                )}
            </div>
            <div className={cx('container')}>
                <div className={cx('annouce-board')}>
                    <ListItem title="Chủ đề" data={topics} />
                </div>
                <div className={cx('timeline')}>
                    <div className={cx('timeline-actions')}>
                        <Select
                            data={topics.map((item) => {
                                return {
                                    title: item.name,
                                    value: item.topicId,
                                };
                            })}
                            handleSelect={handleSelectType}
                            currentData={'/todo-exercise/not-submitted/all'}
                            label="Chủ đề"
                            className={cx('class-select', 'type')}
                        />
                    </div>
                    {exercises.map((item, index) => {
                        return (
                            <PostItem
                                key={index}
                                data={item}
                                role={role}
                                classId={classId}
                                setExercises={setExercises}
                            />
                        );
                    })}
                </div>
            </div>

            <Assignment
                setExercises={setExercises}
                topics={topics}
                open={openAssignment}
                closeOnDocumentClick
                onClose={closeAssignment}
            />
            <Topic setTopics={setTopics} open={openCreateTopic} closeOnDocumentClick onClose={closeCreateTopic} />
            <UpdateTopic
                currentTopic={topic}
                topics={topics}
                setTopics={setTopics}
                open={openUpdateTopic}
                closeOnDocumentClick
                onClose={closeUpdateTopic}
            />
            <Material
                setExercises={setExercises}
                topics={topics}
                open={openMaterial}
                closeOnDocumentClick
                onClose={closeMaterial}
            />
            <Question
                setExercises={setExercises}
                topics={topics}
                open={openQuestion}
                closeOnDocumentClick
                onClose={closeQuestion}
            />
        </div>
    );
}

export default Exercise;
