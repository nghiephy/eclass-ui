import classNames from 'classnames/bind';
import { useEffect, useInsertionEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '~/components/Button';
import styles from './Profile.module.scss';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import Images from '~/components/Images';
import images from '~/assets/images';
import Inputs from '~/components/Inputs';
import useAuth from '~/hooks/useAuth';
import moment from 'moment';

const cx = classNames.bind(styles);

function Profile() {
    const { userId } = useParams();
    const [user, setUser] = useState({ fullName: '', email: '', birthday: '', createdAt: '' });
    const [reviewImage, setReviewImage] = useState();
    const [imagefile, setImagefile] = useState('');
    const [avatar, setAvatar] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const navigate = useNavigate();

    const [openSuccess, setOpenSuccess] = useState(false);
    const closeModalSuccess = () => setOpenSuccess(false);

    console.log(moment('10-2-2022')._isValid);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('avatar', imagefile);
        formData.append('old_avatar', avatar);
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('birthday', birthday);

        if (moment(birthday)._isValid) {
            const response = await axiosPrivate.post('/user/update', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });
            setOpenSuccess(true);
        } else {
            alert('Ngày sinh không hợp lệ!');
        }
    };

    const onAvatarChange = (e) => {
        setImagefile(e.target.files[0]);
        setReviewImage(URL.createObjectURL(e.target.files[0]));
    };

    const getUserData = async () => {
        const userResponse = await axiosPrivate.get(`/user/getinfor/${userId}`);
        const user = userResponse.data.user;

        setUser(user);
        setAvatar(user.avatar);
        setFullName(user.fullName);
        setEmail(user.email);
        setBirthday(user.birthday);
        setCreatedAt(user.createdAt);
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <form action="#" method="POST" id="account-detail-form" onSubmit={handleSubmit(onSubmit)}>
                <div className={cx('image-block', 'form-group')}>
                    <div className={cx('block-account')}>
                        <div className={cx('block-account__imgBox')}>
                            <Images
                                src={
                                    reviewImage
                                        ? reviewImage
                                        : user.avatar
                                        ? `http://localhost:8080${user.avatar}`
                                        : images.noAvatar
                                }
                                alt="avatar"
                            />
                            {parseInt(userId) === auth.id && <label htmlFor="avatar-upload">Chọn ảnh</label>}
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                name="avatar"
                                id="avatar-upload"
                                disabled={!parseInt(userId) === auth.id}
                                onChange={onAvatarChange}
                                // {...register('avatar')}
                            />
                        </div>
                        <div className={cx('block-account__body')}>
                            <h5 className={cx('name')}>{user.fullName}</h5>
                            <p className={cx('message')}>Dung lượng file tối đa 1MB.</p>
                            <p className={cx('message')}>Định dạng: .JPEG, .PNG.</p>
                        </div>
                    </div>
                </div>
                <h5 className={cx('form-section-title')}>Thông tin tài khoản</h5>
                <div className={cx('input-block')}>
                    <Inputs
                        className={cx('input')}
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        primary
                        name="fullName"
                        type="text"
                        label="Họ và tên"
                        readOnly={!(parseInt(userId) === auth.id)}
                        register={register}
                        errors={errors}
                    />
                    <Inputs
                        className={cx('input')}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        primary
                        name="email"
                        type="text"
                        label="Email"
                        readOnly={!(parseInt(userId) === auth.id)}
                        register={register}
                        errors={errors}
                    />
                    <Inputs
                        className={cx('input')}
                        value={birthday || ''}
                        onChange={(event) => setBirthday(event.target.value)}
                        primary
                        name="birthday"
                        type="text"
                        label="Ngày sinh"
                        readOnly={!(parseInt(userId) === auth.id)}
                        register={register}
                        errors={errors}
                    />
                    <Inputs
                        className={cx('input')}
                        value={createdAt}
                        onChange={(event) => setCreatedAt(event.target.value)}
                        primary
                        readOnly
                        name="createdDate"
                        type="text"
                        label="Ngày tham gia"
                    />
                </div>
                <div className={cx('action-section')}>
                    {parseInt(userId) === auth.id && (
                        <Inputs
                            submit
                            type="submit"
                            className={cx('update-btn')}
                            value="Cập nhật"
                            id="account-submit-btn"
                        >
                            Cập nhật
                        </Inputs>
                    )}
                </div>
            </form>

            <Popup onClose={closeModalSuccess} closeOnDocumentClick open={openSuccess}>
                <div className={cx('modal')}>
                    <div className={cx('title')} style={{ fontWeight: 500, textAlign: 'center', marginBottom: '15px' }}>
                        {' '}
                        Cập nhật thông tin thành công!{' '}
                    </div>
                    {/* <div className={cx('sub-title')} style={{ textAlign: 'center' }}>
                        Các thành viên của lớp có thể tham gia qua mã mời phía dưới <br />
                        <h1
                            style={{
                                padding: '10px 5px',
                                border: '1px solid blue',
                                textAlign: 'center',
                                marginTop: '20px',
                            }}
                        >
                            {enrollKey}
                        </h1>
                    </div> */}
                    <div className={cx('form-actions')}>
                        <Button
                            primary
                            className={cx('cancel')}
                            onClick={() => {
                                window.location.reload();
                            }}
                            style={{ margin: '0 auto' }}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </div>
            </Popup>
        </div>
    );
}

export default Profile;
