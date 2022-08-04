import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from '~/components/Button';
import Inputs from '~/components/Inputs';

import styles from './CreateClass.module.scss';

const cx = classNames.bind(styles);

function CreateClass({ onClose, ...props }) {
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
                <h2 className={cx('title')}>Tạo lớp học</h2>
                <p className={cx('sub-title')}>Vui lòng nhập các thông tin bên dưới để tạo lớp học</p>

                <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
                    <Inputs
                        primary
                        name="classname"
                        type="text"
                        label="Tên khoá học (*)"
                        register={register}
                        validate={{
                            required: 'Chưa nhập tên khoá học',
                        }}
                        errors={errors}
                    />
                    <Inputs primary name="semester" type="text" label="Học kì" register={register} />
                    <Inputs primary name="topic" type="text" label="Chủ đề" register={register} />
                    <Inputs primary name="room" type="text" label="Phòng học" register={register} />

                    <div className={cx('form-actions')}>
                        <Button outline className={cx('cancel')} onClick={onClose}>
                            Huỷ
                        </Button>
                        <Inputs submit className={cx('create')} type="submit" value="Tạo" />
                    </div>
                </form>
            </div>
        </Popup>
    );
}

export default CreateClass;
