import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';

import images from '~/assets/images';
import Button from '~/components/Button';
import Inputs from '~/components/Inputs';
import { MyIcon } from '~/components/MyIcons';
import { IcEmail } from '~/components/MyIcons/regular';
import styles from './ForgotPassword.module.scss';

const cx = classNames.bind(styles);

function ForgotPassword() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => console.log(data);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('imgBox')}>
                    <img src={images.logo} alt="logo" className={cx('img')} />
                </div>
                <h2 className={cx('label')}>Lấy lại mật khẩu</h2>
                <p className={cx('sub-label')}>
                    Vui lòng nhập địa chỉ email liên kết với tài khoản để lấy lại mật khẩu
                </p>
            </div>
            <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
                <Inputs
                    primary
                    name="email"
                    type="email"
                    label="Nhập email của bạn"
                    icon={
                        <MyIcon className={cx('icon-show')}>
                            <IcEmail />
                        </MyIcon>
                    }
                    register={register}
                    validate={{
                        required: 'Nhập email của bạn vào đây',
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: 'Email không hợp lệ',
                        },
                    }}
                    errors={errors}
                />

                <div className={cx('form-actions')}>
                    <Inputs submit className={cx('get-pass')} type="submit" value="Lấy lại mật khẩu" />
                    <div style={{ marginBottom: '16px' }}></div>
                    <Button to="/login" className={cx('back')} outline style={{ width: '100%' }}>
                        Trở về
                    </Button>
                </div>
            </form>
            <div className={cx('footer')}>
                <span className={cx('title')}>Bạn đã có tài khoản chưa?</span>
                <Button to="/register" className={cx('register-btn')} text>
                    Đăng ký ngay
                </Button>
            </div>
        </div>
    );
}

export default ForgotPassword;
