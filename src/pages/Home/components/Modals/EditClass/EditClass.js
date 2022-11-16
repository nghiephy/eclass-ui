import classNames from 'classnames/bind';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from '~/components/Button';
import Inputs from '~/components/Inputs';

import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import styles from './EditClass.module.scss';

const cx = classNames.bind(styles);

function EditClass({ onClose, data, ...props }) {
    const [isUpdate, setIsUpdate] = useState(false);
    const [className, setClassName] = useState(data.className);
    const [semester, setSemester] = useState(data.semester);
    const [topic, setTopic] = useState(data.classTopic);
    const [classRoom, setClassRoom] = useState(data.classRoom);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const axiosPrivate = useAxiosPrivate();

    const [openSuccess, setOpenSuccess] = useState(false);
    const closeModalSuccess = () => setOpenSuccess(false);

    const handleOnClose = () => {
        onClose();
        if (isUpdate) {
            window.location.reload();
        }
    };

    const updateClass = async (dataSubmit) => {
        try {
            const response = await axiosPrivate.post('/class/update', {
                ...dataSubmit,
                classId: data.classId,
            });
            console.log(response);
            setOpenSuccess(true);
            setIsUpdate(true);
        } catch (err) {
            console.log(err);
        }
    };

    const onSubmit = (data) => {
        updateClass(data);
        console.log(data);
    };

    return (
        <div>
            <Popup className={cx('wrapper')} {...props} onClose={handleOnClose} style={{ borderRadius: '10px' }}>
                <div className={cx('modal')}>
                    <span className={cx('exits')} onClick={handleOnClose}>
                        &times;
                    </span>
                    <h2 className={cx('title')}>Chỉnh sửa thông tin lớp học</h2>
                    <p className={cx('sub-title')}>Vui lòng nhập thông tin chỉnh sửa vào form bên dưới</p>

                    <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
                        <Inputs
                            primary
                            name="classname"
                            type="text"
                            value={className}
                            onChange={(event) => setClassName(event.target.value)}
                            label="Tên khoá học (*)"
                            register={register}
                            validate={{
                                required: 'Chưa nhập lại tên khoá học',
                            }}
                            errors={errors}
                        />
                        <Inputs
                            primary
                            name="semester"
                            type="text"
                            value={semester}
                            onChange={(event) => setSemester(event.target.value)}
                            label="Học kì"
                            validate={{
                                required: 'Chưa nhập lại học kì',
                            }}
                            errors={errors}
                            register={register}
                        />
                        <Inputs
                            primary
                            name="topic"
                            type="text"
                            value={topic}
                            onChange={(event) => setTopic(event.target.value)}
                            label="Chủ đề"
                            register={register}
                            validate={{
                                required: 'Chưa nhập lại chủ đề',
                            }}
                            errors={errors}
                        />
                        <Inputs
                            primary
                            name="room"
                            type="text"
                            value={classRoom}
                            onChange={(event) => setClassRoom(event.target.value)}
                            label="Phòng học"
                            register={register}
                            validate={{
                                required: 'Chưa nhập lại lớp học',
                            }}
                            errors={errors}
                        />

                        <div className={cx('form-actions')}>
                            <Button outline className={cx('cancel')} onClick={handleOnClose}>
                                Huỷ
                            </Button>
                            <Inputs submit className={cx('create')} type="submit" value="Cập Nhật" />
                        </div>
                    </form>
                </div>
            </Popup>
            <Popup onClose={closeModalSuccess} closeOnDocumentClick open={openSuccess}>
                <div className={cx('modal')}>
                    <div className={cx('title')} style={{ fontWeight: 500, textAlign: 'center', marginBottom: '15px' }}>
                        {' '}
                        Chỉnh sửa thông tin lớp học thành công!{' '}
                    </div>
                    <div className={cx('sub-title')} style={{ textAlign: 'center' }}>
                        Ảnh bìa lớp học có thể được đổi ở giao diện lớp học! <br />
                    </div>
                    <div className={cx('form-actions')}>
                        <Button primary className={cx('cancel')} style={{ margin: '0 auto' }}>
                            Đã hiểu
                        </Button>
                    </div>
                </div>
            </Popup>
            ;
        </div>
    );
}

export default EditClass;
