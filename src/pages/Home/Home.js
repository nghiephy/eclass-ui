import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import Button from '~/components/Button';
import { MyIcon } from '~/components/MyIcons';
import { IcCalendar, IcPenCheck, IcTodoList } from '~/components/MyIcons/regular';
import ClassItem from './components/ClassItem';
import styles from './Home.module.scss';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);

function Home() {
    const { handleSetClassData } = useAuth();
    const [classes, setClasses] = useState({});
    const axiosPrivate = useAxiosPrivate();

    const handleClickToDoExercise = () => {
        handleSetClassData({ role: 'h' });
    };
    const handleClickToDoMark = () => {
        handleSetClassData({ role: 't' });
    };

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getClasses = async () => {
            try {
                const response = await axiosPrivate.get('/class/getall', {
                    signal: controller.signal,
                });
                isMounted && setClasses(response.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        getClasses();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('quick-actions')}>
                <Button
                    to={'/todo-exercise/not-submitted/all'}
                    className={cx('actions-item')}
                    outline
                    leftIcon={
                        <MyIcon>
                            <IcTodoList />
                        </MyIcon>
                    }
                    text
                    onClick={handleClickToDoExercise}
                >
                    Việc cần làm
                </Button>
                <Button
                    to={'/todo-mark/not-marked/all'}
                    className={cx('actions-item')}
                    outline
                    leftIcon={
                        <MyIcon>
                            <IcPenCheck />
                        </MyIcon>
                    }
                    text
                    onClick={handleClickToDoMark}
                >
                    Cần đánh giá
                </Button>
                <Button
                    to={'/calendar'}
                    className={cx('actions-item')}
                    outline
                    leftIcon={
                        <MyIcon>
                            <IcCalendar />
                        </MyIcon>
                    }
                    text
                >
                    Lịch
                </Button>
            </div>
            <h1 className={cx('title')}>Giảng dạy</h1>
            {classes?.classTeach ? (
                <div className={'row col'}>
                    {classes?.classTeach.map((item, index) => {
                        return <ClassItem key={index} data={item} />;
                    })}
                </div>
            ) : (
                <div></div>
            )}

            <h1 className={cx('title')}>Học tập</h1>
            {classes?.classStudy ? (
                <div className={'row col'}>
                    {classes?.classStudy.map((item, index) => {
                        return <ClassItem key={index} data={item} setClasses={setClasses} />;
                    })}
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default Home;
