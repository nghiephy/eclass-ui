import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';

import ListItem from './components/ListItem';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useAuth from '~/hooks/useAuth';

import styles from './ToDoMark.module.scss';
import PostItem from './components/PostItem';
import { useEffect, useState } from 'react';
import Select from '~/components/Select';
import moment from 'moment';

const cx = classNames.bind(styles);

let FILTER_NOT_MARKED = [
    {
        name: 'Tất cả',
        code: 'all',
    },
    {
        name: '14 ngày trước',
        code: '14_days_before',
    },
    {
        name: '7 ngày trước',
        code: '7_days_before',
    },
    {
        name: '7 ngày tới',
        code: '7_days_after',
    },
];

const MENU_NOT_MARKED = [
    {
        title: 'Đánh giá',
        code: 'view_answer',
    },
    {
        title: 'Đánh dấu đã đánh giá',
        code: 'mark',
    },
];

const MENU_MARKED = [
    {
        title: 'Xem đánh giá',
        code: 'view_answer',
    },
    {
        title: 'Bỏ đánh dấu đã đánh giá',
        code: 'un_mark',
    },
];

function ToDoMark() {
    const navigate = useNavigate();
    const { type, filter } = useParams();
    const axiosPrivate = useAxiosPrivate();

    const [classes, setClasses] = useState([]);
    const [classChoosed, setClassChoosed] = useState('0');
    const [classIdList, setClassIdList] = useState([]);
    const [exerciseData, setExerciseData] = useState([]);
    const [exerciseDataOrigin, setExerciseDataOrigin] = useState([]);

    const getClasses = async () => {
        const classesRes = await axiosPrivate.get(`/class/get-classes/GV`);

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
        getExerciseData(classIdArr);
    };

    const getExerciseData = async (idList) => {
        let classIdData = 0;
        if (classChoosed !== '0') {
            classIdData = classChoosed;
        } else {
            classIdData = classIdList.length === 0 ? idList : classIdList;
        }
        let apiString = '/exercise/get-not-marked';
        if (type === 'marked') apiString = `/exercise/get-marked`;
        let exerciseRes = '';
        try {
            if (classIdData) {
                exerciseRes = await axiosPrivate.get(apiString, {
                    params: {
                        classId: classIdData,
                    },
                });
            }
            console.log(exerciseRes);
            setExerciseData(exerciseRes?.data?.exerciseRes);
            setExerciseDataOrigin(exerciseRes?.data?.exerciseRes);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFilter = () => {
        let newListNotSubmitted = exerciseDataOrigin;

        if (filter === '14_days_before') {
            newListNotSubmitted = exerciseDataOrigin.filter((item) => {
                console.log(moment(item.deadline).diff(moment(), 'weeks'));
                const weeks = moment(item.deadline).diff(moment(), 'weeks');
                return weeks === -1 && moment(item.deadline) < moment();
            });
        }
        if (filter === '7_days_before') {
            newListNotSubmitted = exerciseDataOrigin.filter((item) => {
                console.log(moment(item.deadline).diff(moment(), 'weeks'));
                const weeks = moment(item.deadline).diff(moment(), 'weeks');
                return weeks === 0 && moment(item.deadline) < moment();
            });
        }
        if (filter === '7_days_after') {
            newListNotSubmitted = exerciseDataOrigin.filter((item) => {
                const weeks = moment(item.deadline).diff(moment(), 'weeks');
                return weeks === 0 && moment(item.deadline) > moment();
            });
        }
        console.log(newListNotSubmitted);
        setExerciseData(newListNotSubmitted);
    };

    const handleSelectFilter = (filter) => {
        navigate(`/todo-mark/${type}${filter !== 'all' ? `/${filter}` : '/all'}`);
    };

    const handleSelectType = (type) => {
        navigate(type);
    };

    useEffect(() => {
        getClasses();
    }, [type]);

    useEffect(() => {
        handleFilter();
    }, [filter]);

    useEffect(() => {
        getExerciseData();
        navigate(`/todo-mark/${type}/all`);
    }, [classChoosed]);

    console.log(exerciseData);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('annouce-board')}>
                    <ListItem
                        title="Bộ lọc"
                        type={type}
                        data={type === 'not-marked' ? FILTER_NOT_MARKED : FILTER_NOT_MARKED}
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
                                { title: '14 ngày trước', value: '14_days_before' },
                                { title: '7 ngày trước', value: '7_days_before' },
                                { title: '7 ngày tới', value: '7_days_after' },
                            ]}
                            handleSelect={handleSelectFilter}
                            currentData={'all'}
                            label="Bộ lọc"
                            className={cx('class-select', 'filter')}
                        />
                        <Select
                            data={[
                                { title: 'Chưa đánh giá', value: '/todo-mark/not-marked/all' },
                                { title: 'Đã đánh giá', value: '/todo-mark/marked/all' },
                            ]}
                            handleSelect={handleSelectType}
                            currentData={'/todo-mark/not-marked/all'}
                            label="Trạng thái"
                            className={cx('class-select', 'type')}
                        />
                    </div>
                    {exerciseData?.map((item, index) => {
                        return (
                            <PostItem
                                key={index}
                                data={item}
                                menuPost={type === 'not-marked' ? MENU_NOT_MARKED : MENU_MARKED}
                                setExerciseData={setExerciseData}
                                setExerciseDataOrigin={setExerciseDataOrigin}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ToDoMark;
