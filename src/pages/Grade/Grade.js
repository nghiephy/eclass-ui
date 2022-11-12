import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { downloadExcel } from 'react-export-table-to-excel';
import { Link, useNavigate } from 'react-router-dom';

import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useAuth from '~/hooks/useAuth';

import styles from './Grade.module.scss';
import Button from '~/components/Button';
import moment from 'moment';

const cx = classNames.bind(styles);

function Grade() {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const { classData } = useAuth();
    const [headerData, setHeaderData] = useState([]);
    const [headerExportData, setHeaderExportData] = useState([]);
    const [bodyData, setBodyData] = useState([]);
    const [bodyExportData, setBodyExportData] = useState([]);

    function handleDownloadExcel() {
        downloadExcel({
            fileName: 'react-export-table-to-excel -> downloadExcel method',
            sheet: 'react-export-table-to-excel',
            tablePayload: {
                header: headerExportData,
                // accept two different data structures
                body: bodyExportData,
            },
        });
    }

    const getNameExercises = async () => {
        const nameExerciseRes = await axiosPrivate.get(`/exercise/get-name-exercise/${classData.classId}`);
        console.log(nameExerciseRes);
        const originHeader = nameExerciseRes.data.nameExercise;
        const customHeader = ['Tên Học Sinh'];
        originHeader.map((item) => {
            return customHeader.push(item.content);
        });
        setHeaderData([{ content: 'Tên Học Sinh', id: 0 }, ...originHeader]);
        setHeaderExportData(customHeader);
    };

    const getAllScore = async () => {
        const allScoreRes = await axiosPrivate.get(`/exercise/get-all-score/${classData.classId}`);
        const originBody = allScoreRes.data.allScore;
        const customBody = [];
        const displayBody = [];
        originBody.map((userScore, index) => {
            const itemBody = [];
            const itemDisplay = [];
            userScore.map((item, index) => {
                if (index === 0) {
                    itemBody.push(item.fullName);
                    itemDisplay.push({ fullName: item.fullName, userId: item.userId });
                }
                if (index !== 0) {
                    itemBody.push(item.score);
                    itemDisplay.push(item.score);
                }
            });
            customBody.push(itemBody);
            displayBody.push(itemDisplay);
        });
        console.log(allScoreRes);
        setBodyData(displayBody);
        setBodyExportData(customBody);
    };

    console.log(bodyData);

    const handleNavigateDetailSubmit = (postId, type) => {
        if (type) navigate(`/exercise/mark/${auth.id}/${type}/${postId}`);
    };

    useEffect(() => {
        getNameExercises();
        getAllScore();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('title')}>Bảng điểm của lớp học</h2>
                <Button primary onClick={handleDownloadExcel} className={cx('download-btn')}>
                    Tải file Excel
                </Button>

                <table>
                    <tbody>
                        <tr>
                            {headerData.map((head) => (
                                <th key={head.id} className={cx('header-column')}>
                                    <h3
                                        onClick={() => {
                                            handleNavigateDetailSubmit(head.id, head.type);
                                        }}
                                        className={cx('header-name')}
                                    >
                                        {head.content}
                                    </h3>
                                    <p className={cx('header-deadline')}>
                                        {head.deadline
                                            ? `Hạn: ${moment(head.deadline).format('DD-MM-YYYY')}`
                                            : head.type && `Không có hạn`}
                                    </p>
                                </th>
                            ))}
                        </tr>

                        {bodyData.map((item, i) => (
                            <tr key={i}>
                                {item.map((it) => (
                                    <td key={it?.userId ? it.userId : it}>
                                        {it?.fullName ? <Link to={`/profile/${it.userId}`}>{it.fullName}</Link> : it}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Grade;
