import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';

import images from '~/assets/images';
import Button from '~/components/Button';
import Inputs from '~/components/Inputs';
import { MyIcon } from '~/components/MyIcons';
import { IcProfile } from '~/components/MyIcons/regular';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
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
                <h2 className={cx('label')}>Đăng nhập</h2>
                <p className={cx('sub-label')}>Bạn đã có tài khoản chưa? Vui lòng đăng nhập để tiếp tục</p>
            </div>
            <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
                <Inputs
                    primary
                    name="username"
                    type="text"
                    label="Tài khoản"
                    icon={
                        <MyIcon className={cx('icon-show')}>
                            <IcProfile />
                        </MyIcon>
                    }
                    register={register}
                    validate={{
                        required: 'Chưa nhập tài khoản',
                        minLength: { value: 6, message: 'Tối thiểu 6 kí tự' },
                    }}
                    errors={errors}
                />
                <Inputs
                    primary
                    name="password"
                    type="password"
                    label="Mật khẩu"
                    autoComplete="on"
                    register={register}
                    validate={{
                        required: 'Chưa nhập mật khẩu',
                        minLength: { value: 6, message: 'Tối thiểu 6 kí tự' },
                    }}
                    errors={errors}
                />

                <div className={cx('form-sub-actions')}>
                    <Inputs
                        chkradio
                        className={cx('remember')}
                        name="remember"
                        type="checkbox"
                        label="Ghi nhớ đăng nhập"
                        register={register}
                    />
                    <Button to="/forgot-password" className={cx('forgot')} text>
                        Quên mật khẩu?
                    </Button>
                </div>

                <div className={cx('form-actions')}>
                    <Inputs submit className={cx('login')} type="submit" value="Đăng nhập" />
                    <div style={{ marginBottom: '16px' }}></div>
                    <Button className={cx('login-google')} outline style={{ width: '100%' }}>
                        <img className={cx('login-google-icon')} alt="google icon" src={images.googleSignIn} />
                        Đăng nhập với Google
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

export default Login;
