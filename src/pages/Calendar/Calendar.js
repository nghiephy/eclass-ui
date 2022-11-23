import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

import styles from './Calendar.module.scss';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import moment from 'moment';
import EventDetail from './components/EventDetail';

const cx = classNames.bind(styles);

function Calendar() {
    const axiosPrivate = useAxiosPrivate();

    const [openEventDetail, setOpenEventDetail] = useState(false);
    const closeEventDetail = () => setOpenEventDetail(false);

    const [classIdList, setClassIdList] = useState([]);
    const [exerciseData, setExerciseData] = useState([]);
    const [dataDisplay, setDataDisplay] = useState([]);
    const [dataEventDetail, setDataEventDetail] = useState();

    const getExerciseData = async (idList) => {
        let apiString = '/exercise/get-not-submitted';

        const exerciseRes = await axiosPrivate.get(apiString, {
            params: {
                classId: classIdList.length === 0 ? idList : classIdList,
            },
        });
        console.log(exerciseRes);
        setExerciseData(exerciseRes?.data?.exerciseRes);
        handleData(exerciseRes?.data?.exerciseRes);
    };

    const getEventDetail = async (type, classId, postId) => {
        let apiString = `/exercise/get-detail/${classId}/${postId}`;

        if (type === 'CH') {
            apiString = `/question/get-detail/${classId}/${postId}`;
        }

        const eventDetailRes = await axiosPrivate.get(apiString);
        console.log(eventDetailRes);
        if (type === 'CH') {
            setDataEventDetail(eventDetailRes?.data?.question);
        } else {
            setDataEventDetail(eventDetailRes?.data?.exercise);
        }
    };

    const getClasses = async () => {
        const classesRes = await axiosPrivate.get(`/class/get-classes/HS`);

        const originClasses = classesRes.data.data;
        const classIdArr = originClasses.map((item) => {
            return item.classId;
        });
        setClassIdList(classIdArr);
        getExerciseData(classIdArr);
    };

    console.log(dataDisplay);

    const handleData = async (dataRes) => {
        const data = dataRes.map((item) => {
            return {
                ...item,
                Id: item.postId,
                title: item.title,
                date: moment(item.deadline).format('YYYY-MM-DD'),
            };
        });
        setDataDisplay(data);
    };

    const handleClickEvent = (data) => {
        setOpenEventDetail((o) => !o);
        getEventDetail(data.type, data.classId, data.postId);
    };

    function renderEventContent(eventInfo) {
        return (
            <div className={cx('event-item')} onClick={() => handleClickEvent(eventInfo.event.extendedProps)}>
                <p>{eventInfo.event.title}</p>
            </div>
        );
    }

    useEffect(() => {
        getClasses();
        getExerciseData();
        handleData(exerciseData);
    }, []);

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={dataDisplay}
                eventContent={renderEventContent}
            />
            <EventDetail
                open={openEventDetail}
                closeOnDocumentClick
                onClose={closeEventDetail}
                data={dataEventDetail}
            />
        </div>
    );
}

export default Calendar;
