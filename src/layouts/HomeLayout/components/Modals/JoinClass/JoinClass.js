import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from '~/components/Button';
import Inputs from '~/components/Inputs';

import styles from './JoinClass.module.scss';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function JoinClass({ onClose, ...props }) {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        const enrollKey = data.enrollKey;

        try {
            const response = await axiosPrivate.post(`/class/enroll`, {
                enrollKey: enrollKey,
            });
            console.log(response);
            navigate(`/stream/${response.data.data.id}`);
        } catch (err) {
            if (err.response.data.code === 'invalid') {
                alert('Mã mời không hợp lệ!');
            } else if (err.response.data.code === 'joined') {
                alert('Bạn đã tham gia lớp học này rồi!');
            } else {
                alert('Không thể tham gia lớp học!');
            }
        }
    };

    return (
        <Popup className={cx('wrapper')} {...props} onClose={onClose} style={{ borderRadius: '10px' }}>
            <div className={cx('modal')}>
                <span className={cx('exits')} onClick={onClose}>
                    &times;
                </span>
                <h2 className={cx('title')}>Tham gia lớp học</h2>
                <p className={cx('sub-title')}>Vui lòng nhập mã lớp học để tham gia vào lớp học</p>

                <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
                    <Inputs
                        primary
                        name="enrollKey"
                        type="text"
                        label="Mã khoá học (*)"
                        register={register}
                        validate={{
                            required: 'Chưa nhập mã khoá học',
                        }}
                        errors={errors}
                    />
                    <div className={cx('form-actions')}>
                        <Button outline className={cx('cancel')} onClick={onClose}>
                            Huỷ
                        </Button>
                        <Inputs submit className={cx('create')} type="submit" value="Tham gia" />
                    </div>
                </form>
            </div>
        </Popup>
    );
}

export default JoinClass;
