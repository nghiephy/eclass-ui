import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';

import ListItem from './components/ListItem';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useAuth from '~/hooks/useAuth';

import styles from './ToDoExercise.module.scss';
import PostItem from './components/PostItem';
import { useEffect, useState } from 'react';
import Select from '~/components/Select';
import moment from 'moment';

const cx = classNames.bind(styles);

let FILTER_NOT_SUBMITTED = [
    {
        name: 'Tất cả',
        code: 'all',
    },
    {
        name: '7 ngày tới',
        code: 'this_week',
    },
    {
        name: '14 ngày tới',
        code: 'next_week',
    },
    {
        name: '21 ngày tới',
        code: 'next_2_week',
    },
];

let FILTER_SUBMITTED = [
    {
        name: 'Tất cả',
        code: 'all',
    },
    {
        name: 'Tuần trước',
        code: 'last_week',
    },
    {
        name: 'Tuần này',
        code: 'this_week',
    },
    {
        name: 'Tuần tới',
        code: 'next_week',
    },
];

let FILTER_OUT_DATE = [
    {
        name: 'Tất cả',
        code: 'all',
    },
    {
        name: '2 tuần trước',
        code: 'last_2_week',
    },
    {
        name: 'Tuần trước',
        code: 'last_week',
    },
    {
        name: 'Tuần này',
        code: 'this_week',
    },
];

function ToDoExercise() {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const { type, filter } = useParams();
    const [classes, setClasses] = useState([]);
    const [classIdList, setClassIdList] = useState([]);
    const [notSubmittedList, setNotSubmiitedList] = useState([]);
    const [notSubmittedListOrigin, setNotSubmiitedListOrigin] = useState([]);
    const [classChoosed, setClassChoosed] = useState('0');

    const getClasses = async () => {
        const classesRes = await axiosPrivate.get(`/class/get-classes/HS`);

        console.log(classesRes);
        const classIdArr = [];
        const originClasses = classesRes.data.data;
        const selectClasses = originClasses.map((item) => {
            classIdArr.push(item.classId);
            return { title: item.className, value: item.classId };
        });
        setClasses(selectClasses);
        setClassChoosed(classIdArr);
        setClassIdList(classIdArr);
    };

    const getExerciseData = async () => {
        let classIdData = 0;
        if (classChoosed !== '0') {
            classIdData = classChoosed;
        } else {
            classIdData = classIdList;
        }
        let apiString = '/exercise/get-not-submitted';
        if (type === 'submitted') apiString = `/exercise/get-submitted`;
        if (type === 'out-date') apiString = `/exercise/get-out-date`;

        const notSubmittedRes = await axiosPrivate.get(apiString, {
            params: {
                classId: classIdData,
            },
        });
        console.log(notSubmittedRes);
        setNotSubmiitedList(notSubmittedRes.data.exerciseRes);
        setNotSubmiitedListOrigin(notSubmittedRes.data.exerciseRes);
    };

    const handleFilter = () => {
        let newListNotSubmitted = notSubmittedListOrigin;

        if (filter === 'last_2_week') {
            newListNotSubmitted = notSubmittedListOrigin.filter((item) => {
                const weeks = moment(item.deadline).diff(moment(), 'weeks');
                return weeks === -2;
            });
        }
        if (filter === 'last_week') {
            newListNotSubmitted = notSubmittedListOrigin.filter((item) => {
                const weeks = moment(item.deadline).diff(moment(), 'weeks');
                return weeks === -1;
            });
        }
        if (filter === 'this_week') {
            newListNotSubmitted = notSubmittedListOrigin.filter((item) => {
                const weeks = moment(item.deadline).diff(moment(), 'weeks');
                return weeks === 0;
            });
        }
        if (filter === 'next_week') {
            newListNotSubmitted = notSubmittedListOrigin.filter((item) => {
                console.log(moment(item.deadline).diff(moment(), 'weeks'));
                const weeks = moment(item.deadline).diff(moment(), 'weeks');
                return weeks === 1;
            });
        }
        if (filter === 'next_2_week') {
            newListNotSubmitted = notSubmittedListOrigin.filter((item) => {
                const weeks = moment(item.deadline).diff(moment(), 'weeks');
                return weeks === 2;
            });
            console.log(filter);
        }
        console.log(newListNotSubmitted);
        setNotSubmiitedList(newListNotSubmitted);
    };

    const handleSelectFilter = (filter) => {
        navigate(`/todo-exercise/${type}${filter !== 'all' ? `/${filter}` : '/all'}`);
    };

    const handleSelectType = (type) => {
        navigate(type);
    };

    useEffect(() => {
        getClasses();
    }, []);

    useEffect(() => {
        getExerciseData();
    }, [type]);

    useEffect(() => {
        handleFilter();
    }, [filter]);

    useEffect(() => {
        getExerciseData();
        navigate(`/todo-exercise/${type}/all`);
    }, [classChoosed]);

    console.log(notSubmittedList);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('annouce-board')}>
                    <ListItem
                        title="Bộ lọc"
                        type={type}
                        data={
                            type === 'not-submitted'
                                ? FILTER_NOT_SUBMITTED
                                : type === 'submitted'
                                ? FILTER_SUBMITTED
                                : FILTER_OUT_DATE
                        }
                    />
                </div>
                <div className={cx('timeline')}>
                    <div className={cx('timeline-actions')}>
                        <Select
                            data={[{ title: 'Tất cả', value: 0 }, ...classes]}
                            handleSelect={setClassChoosed}
                            currentData={0}
                            label="Chọn lớp"
                            className={cx('class-select')}
                        />
                        <Select
                            data={[
                                { title: 'Tất cả', value: 'all' },
                                { title: '7 ngày tới', value: 'this_week' },
                                { title: '14 ngày tới', value: 'next_week' },
                                { title: '21 ngày tới', value: 'next_2_week' },
                            ]}
                            handleSelect={handleSelectFilter}
                            currentData={'all'}
                            label="Bộ lọc"
                            className={cx('class-select', 'filter')}
                        />
                        <Select
                            data={[
                                { title: 'Chưa nộp', value: '/todo-exercise/not-submitted/all' },
                                { title: 'Đã nộp', value: '/todo-exercise/submitted/all' },
                                { title: 'Quá hạn', value: '/todo-exercise/out-date/all' },
                            ]}
                            handleSelect={handleSelectType}
                            currentData={'/todo-exercise/not-submitted/all'}
                            label="Trạng thái"
                            className={cx('class-select', 'type')}
                        />
                    </div>

                    {notSubmittedList?.map((item, index) => {
                        return <PostItem key={index} data={item} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default ToDoExercise;
