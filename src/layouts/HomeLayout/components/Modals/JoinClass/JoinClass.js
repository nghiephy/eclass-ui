import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from '~/components/Button';
import Inputs from '~/components/Inputs';

import styles from './JoinClass.module.scss';

const cx = classNames.bind(styles);

function JoinClass({ onClose, ...props }) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => console.log(data);

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
                        name="classname"
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
