import classNames from 'classnames/bind';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import images from '~/assets/images';
import Button from '~/components/Button';
import Inputs from '~/components/Inputs';
import { MyIcon } from '~/components/MyIcons';
import { IcEmail, IcProfile } from '~/components/MyIcons/regular';
import styles from './Register.module.scss';
import axios from '~/api/axios';
import Popup from 'reactjs-popup';

const cx = classNames.bind(styles);

function Register() {
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [password, setPassword] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const closeModalSuccess = () => setOpenSuccess(false);

    const handleRegister = async (data) => {
        try {
            const regisResponse = await axios.post('user/register', { ...data });

            console.log(regisResponse);
            setOpenSuccess(true);
        } catch (err) {
            alert('Vui lòng thử một tài khoản khác!');
        }
    };

    const onSubmit = (data) => {
        handleRegister(data);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('imgBox')}>
                    <img src={images.logo} alt="logo" className={cx('img')} />
                </div>
                <h2 className={cx('label')}>Đăng ký</h2>
                <p className={cx('sub-label')}>
                    Đăng ký ngay tài khoản! Để trải nghiệm các tính năng tuyệt vời trên EClass
                </p>
            </div>
            <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
                <Inputs
                    primary
                    name="fullname"
                    type="text"
                    label="Họ và tên"
                    icon={
                        <MyIcon className={cx('icon-show')}>
                            <IcProfile />
                        </MyIcon>
                    }
                    register={register}
                    validate={{
                        required: 'Chưa nhập họ tên',
                        minLength: { value: 6, message: 'Tối thiểu 6 kí tự' },
                    }}
                    errors={errors}
                />
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
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    register={register}
                    validate={{
                        required: 'Chưa nhập mật khẩu',
                        minLength: { value: 6, message: 'Tối thiểu 6 kí tự' },
                    }}
                    errors={errors}
                />

                <Inputs
                    primary
                    name="repassword"
                    type="password"
                    label="Nhập lại mật khẩu"
                    autoComplete="on"
                    register={register}
                    validate={{
                        required: 'Nhập lại mật khẩu vào đây',
                        minLength: { value: 6, message: 'Tối thiểu 6 kí tự' },
                        validate: {
                            compareValue: (value) => {
                                if (value !== password) {
                                    return 'Mật khẩu nhập lại không khớp';
                                }
                            },
                        },
                    }}
                    errors={errors}
                />

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
                    <Inputs submit className={cx('register')} type="submit" value="Đăng Ký" />
                </div>
            </form>
            <div className={cx('footer')}>
                <span className={cx('title')}>Bạn đã có tài khoản?</span>
                <Button to="/login" className={cx('login-btn')} text>
                    Đăng nhập ngay
                </Button>
            </div>

            <Popup onClose={closeModalSuccess} closeOnDocumentClick open={openSuccess}>
                <div className={cx('modal')}>
                    <div className={cx('title')} style={{ fontWeight: 500, textAlign: 'center', marginBottom: '15px' }}>
                        Đăng ký thành công!
                    </div>
                    <div className={cx('sub-title')} style={{ textAlign: 'center' }}>
                        Nhớ cập nhật thêm thông tin cho mọi người hiểu thêm về bàn nhé! <br />
                    </div>
                    <div className={cx('form-actions')}>
                        <Button
                            primary
                            className={cx('cancel')}
                            onClick={() => {
                                navigate('/login');
                            }}
                            style={{ margin: '0 auto' }}
                        >
                            Đăng nhập
                        </Button>
                    </div>
                </div>
            </Popup>
        </div>
    );
}

export default Register;
