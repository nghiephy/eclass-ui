import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '~/components/Button';
import Menu from '~/components/Popover/Menu';
import ListItem from './components/ListItem';
import Assignment, { Topic } from './components/Modals';
import Material from './components/Modals/Material';
import Question from './components/Modals/Question';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useAuth from '~/hooks/useAuth';

import styles from './Member.module.scss';
import MemberItem from './components/MemberItem';

const cx = classNames.bind(styles);

const FILTER_LABEL = [
    {
        name: 'Tất cả',
        code: 'all',
    },
    {
        name: 'Giáo viên',
        code: 't',
    },
    {
        name: 'Học sinh',
        code: 'h',
    },
];

function Member() {
    const { classData } = useAuth();
    const { filter } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [teacherList, setTeacherList] = useState([]);
    const [studentList, setStudentList] = useState([]);

    const getMemberData = async () => {
        const memberRes = await axiosPrivate.get(`/user/get-all/${classData.classId}`);
        console.log(memberRes);
        setTeacherList(memberRes.data.teacherData);
        setStudentList(memberRes.data.studentData);
    };

    useEffect(() => {
        getMemberData();
    }, []);

    console.log(teacherList);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('annouce-board')}>
                    <ListItem title="Thành viên" data={FILTER_LABEL} />
                </div>
                <div className={cx('timeline')}>
                    {filter !== 'h' && (
                        <div>
                            <h1 className={cx('timeline-title')}>Giáo viên</h1>
                            {teacherList?.map((teacherData, index) => {
                                return <MemberItem key={index} data={teacherData} />;
                            })}
                        </div>
                    )}
                    {filter !== 't' && (
                        <div>
                            <h1 className={cx('timeline-title')}>Học sinh</h1>
                            {studentList?.map((studentData, index) => {
                                return <MemberItem key={index} data={studentData} setStudentList={setStudentList} />;
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Member;
