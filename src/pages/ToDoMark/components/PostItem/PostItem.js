import classNames from 'classnames/bind';
import 'reactjs-popup/dist/index.css';
import 'react-quill/dist/quill.snow.css';

import styles from './PostItem.module.scss';
import Images from '~/components/Images';
import images from '~/assets/images';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Menu from '~/components/Popover/Menu';
import Button from '~/components/Button';
import { MyIcon } from '~/components/MyIcons';
import { IcThreeDotsVertical } from '~/components/MyIcons/regular';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import { useState } from 'react';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);

function PostItem({ data, menuPost, setExerciseData, setExerciseDataOrigin }) {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const { auth, handleSetClassData } = useAuth();

    const [actionHidden, setActionHidden] = useState(false);

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

    const handleOnChange = async (menuItem) => {
        if (menuItem.code === 'mark') {
            const markRes = await axiosPrivate.post(`/post/toggle-mark-post`, {
                classId: data.classId,
                postId: data.postId,
                value: true,
            });
            setExerciseData((prev) => {
                const newExercises = prev.filter((item) => item.postId !== data.postId);
                return newExercises;
            });
            setExerciseDataOrigin((prev) => {
                const newExercises = prev.filter((item) => item.postId !== data.postId);
                return newExercises;
            });
        }
        if (menuItem.code === 'un_mark') {
            const markRes = await axiosPrivate.post(`/post/toggle-mark-post`, {
                classId: data.classId,
                postId: data.postId,
                value: false,
            });
            setExerciseData((prev) => {
                const newExercises = prev.filter((item) => item.postId !== data.postId);
                return newExercises;
            });
            setExerciseDataOrigin((prev) => {
                const newExercises = prev.filter((item) => item.postId !== data.postId);
                return newExercises;
            });
        }
        if (menuItem.code === 'view_answer') {
            navigate(`/exercise/mark/${auth.id}/${data.type}/${data.postId}`);
        }
        setActionHidden(true);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('more-btn-wrapper')}>
                <Menu
                    arrow={false}
                    hideOnClick={true}
                    trigger={'click'}
                    placement="bottom-end"
                    delay={[50, 50]}
                    items={[...menuPost]}
                    data={data}
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
