import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Button from '~/components/Button';
import Inputs from '~/components/Inputs';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import { useParams } from 'react-router-dom';

import styles from './JoinExam.module.scss';

const cx = classNames.bind(styles);

function JoinExam({ onClose, setTopics, ...props }) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const axiosPrivate = useAxiosPrivate();
    const { classId } = useParams();

    const onSubmit = async (data) => {
        const topicRes = await axiosPrivate.post('/topic/create', {
            classId: classId,
            topic: data.topic,
        });
        setTopics((prev) => {
            return [...prev, topicRes.data.response];
        });
        onClose();
    };

    return (
        <Popup className={cx('wrapper')} {...props} onClose={onClose} style={{ borderRadius: '10px' }}>
            <div className={cx('modal')}>
                <span className={cx('exits')} onClick={onClose}>
                    &times;
                </span>
                <h2 className={cx('title')}>Xác nhận vào bài thi</h2>
                <p className={cx('sub-title')}>Vui lòng nhập mật khẩu để tiếp tục</p>

                <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
                    <Inputs
                        primary
                        name="passwordJoin"
                        type="text"
                        label="Mật khẩu (*)"
                        register={register}
                        validate={{
                            required: 'Chưa nhập mật khẩu',
                        }}
                        errors={errors}
                    />
                    <div className={cx('form-actions')}>
                        <Button outline className={cx('cancel')} onClick={onClose}>
                            Huỷ
                        </Button>
                        <Inputs submit className={cx('create')} type="submit" value="Xác Nhận" />
                    </div>
                </form>
            </div>
        </Popup>
    );
}

export default JoinExam;
