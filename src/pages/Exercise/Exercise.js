import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from '~/components/Button';
import Menu from '~/components/Popover/Menu';
import ListItem from './components/ListItem';
import Assignment, { Topic } from './components/Modals';
import Material from './components/Modals/Material';
import Question from './components/Modals/Question';
import PostItem from './components/PostItem';

import styles from './Exercise.module.scss';

const cx = classNames.bind(styles);

const TOPIC_LIST = [
    {
        name: 'Tẩt cả',
        code: '',
    },
    {
        name: 'Lập trình',
        code: 'programing',
    },
];

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
    const [actionHidden, setActionHidden] = useState(false);
    const [openAssignment, setOpenAssignment] = useState(false);
    const closeAssignment = () => setOpenAssignment(false);
    const [openCreateTopic, setOpenCreateTopic] = useState(false);
    const closeCreateTopic = () => setOpenCreateTopic(false);
    const [openMaterial, setOpenMaterial] = useState(false);
    const closeMaterial = () => setOpenMaterial(false);
    const [openQuestion, setOpenQuestion] = useState(false);
    const closeQuestion = () => setOpenQuestion(false);

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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('actions-section')}>
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
            </div>
            <div className={cx('container')}>
                <div className={cx('annouce-board')}>
                    <ListItem title="Chủ đề" data={TOPIC_LIST} />
                </div>
                <div className={cx('timeline')}>
                    <PostItem />
                </div>
            </div>

            <Assignment open={openAssignment} closeOnDocumentClick onClose={closeAssignment} />
            <Topic open={openCreateTopic} closeOnDocumentClick onClose={closeCreateTopic} />
            <Material open={openMaterial} closeOnDocumentClick onClose={closeMaterial} />
            <Question open={openQuestion} closeOnDocumentClick onClose={closeQuestion} />
        </div>
    );
}

export default Exercise;
