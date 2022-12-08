import classNames from 'classnames/bind';
import 'reactjs-popup/dist/index.css';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';

import useAxiosPrivate from '~/hooks/useAxiosPrivate';

import styles from './PostItem.module.scss';
import Images from '~/components/Images';
import images from '~/assets/images';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);

function PostItem({ data, role, classId, setExercises }) {
    const navigate = useNavigate();
    const { handleSetClassData } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    let icon = images.noImage;
    if (data?.type === 'TL') {
        icon = images.materialIcon;
    }
    if (data?.type === 'BT') {
        icon = images.exerciseIcon;
    }
    if (data?.type === 'CH') {
        icon = images.questionIcon;
    }

    const handleClickItem = (classId) => {
        handleSetClassData({ classId: classId, role: 'h' });
    };

    useEffect(() => {
        // setDataExercise({ ...data });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Link
                to={`/exercise/h/${data?.classId}/${data?.type}/${data?.postId}/detail`}
                className={cx('content')}
                onClick={() => {
                    handleClickItem(data?.classId);
                }}
            >
                <div className={cx('type-question')}>
                    <div className={cx('img-box')}>
                        <Images alt="type question icon" src={icon} />
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('body-content')}>
                        <h4 className={cx('title')}>{data?.title}</h4>
                        <p className={cx('deadline')}>
                            {data?.deadline ? moment(data.deadline).format('DD/MM/YYYY') : 'Không có ngày đến hạn'}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default PostItem;
