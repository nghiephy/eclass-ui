import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from '~/components/Button';
import Inputs from '~/components/Inputs';

import styles from './EventDetail.module.scss';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);

function EventDetail({ onClose, data, ...props }) {
    const { handleSetClassData } = useAuth();
    const navigate = useNavigate();

    const handleClickEvent = (data) => {
        handleSetClassData({ classId: data.classId, role: 'h' });
        navigate(`/exercise/h/${data?.classId}/${data?.type}/${data?.postId}/detail`);
    };

    return (
        <Popup className={cx('wrapper')} {...props} onClose={onClose} style={{ borderRadius: '10px' }}>
            <div className={cx('modal')}>
                <span className={cx('exits')} onClick={onClose}>
                    &times;
                </span>
                <h2 className={cx('title')}>Thông tin bài tập</h2>

                <div className={cx('item')}>
                    <h3>Tiêu đề</h3>
                    <p className={cx('sub-title')}>{data?.title}</p>
                </div>
                <div className={cx('item')}>
                    <h3>Hướng dẫn</h3>
                    <p className={cx('sub-title')}>{data?.guide}</p>
                </div>
                <div className={cx('item')}>
                    <h3>Lớp</h3>
                    <p className={cx('sub-title')}>{data?.className}</p>
                </div>
                <div className={cx('form-actions')}>
                    <Button outline className={cx('cancel')} onClick={onClose}>
                        Huỷ
                    </Button>
                    <Button primary className={cx('cancel')} onClick={() => handleClickEvent(data)}>
                        Xem chi tiết
                    </Button>
                </div>
            </div>
        </Popup>
    );
}

export default EventDetail;
