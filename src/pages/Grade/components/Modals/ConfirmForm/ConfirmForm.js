import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from '~/components/Button';
import Inputs from '~/components/Inputs';

import styles from './ConfirmForm.module.scss';

const cx = classNames.bind(styles);

function ConfirmForm({ onClose, handleDeletePost, ...props }) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        handleDeletePost();
        onClose();
    };

    return (
        <Popup className={cx('wrapper')} {...props} onClose={onClose} style={{ borderRadius: '10px' }}>
            <div className={cx('modal')}>
                <span className={cx('exits')} onClick={onClose}>
                    &times;
                </span>
                <h2 className={cx('title')}>Xác nhận</h2>
                <p className={cx('sub-title')}>Bạn có chắc muốn xoá bài đăng này không?</p>

                <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
                    <div className={cx('form-actions')}>
                        <Button outline className={cx('cancel')} onClick={onClose}>
                            Huỷ
                        </Button>
                        <Inputs submit className={cx('create')} type="submit" value="Xác nhận" />
                    </div>
                </form>
            </div>
        </Popup>
    );
}

export default ConfirmForm;
