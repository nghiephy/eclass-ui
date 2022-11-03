import classNames from 'classnames/bind';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from '~/components/Button';
import Inputs from '~/components/Inputs';
import { useNavigate } from 'react-router-dom';

import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import styles from './CreateClass.module.scss';

const cx = classNames.bind(styles);

function CreateClass({ onClose, ...props }) {
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const axiosPrivate = useAxiosPrivate();
    const [enrollKey, setEnrollKey] = useState('');
    const [classId, setClassId] = useState();

    const [openSuccess, setOpenSuccess] = useState(false);
    const closeModalSuccess = () => setOpenSuccess(false);

    const createClass = async (data) => {
        try {
            const response = await axiosPrivate.post('/class/create', JSON.stringify(data));
            setEnrollKey(response.data.data.enrollKey);
            onClose();
            setOpenSuccess(true);
            setClassId(response.data.data.id);
        } catch (err) {
            console.log(err);
        }
    };

    const onSubmit = (data) => {
        createClass(data);
    };

    return (
        <div>
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
            <Popup onClose={closeModalSuccess} closeOnDocumentClick open={openSuccess}>
                <div className={cx('modal')}>
                    <div className={cx('title')} style={{ fontWeight: 500, textAlign: 'center', marginBottom: '15px' }}>
                        {' '}
                        Tạo lớp học thành công!{' '}
                    </div>
                    <div className={cx('sub-title')} style={{ textAlign: 'center' }}>
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
                    </div>
                    <div className={cx('form-actions')}>
                        <Button
                            primary
                            className={cx('cancel')}
                            onClick={() => {
                                navigate(`/stream/${classId}`);
                            }}
                            style={{ margin: '0 auto' }}
                        >
                            Đã hiểu
                        </Button>
                    </div>
                </div>
            </Popup>
            ;
        </div>
    );
}

export default CreateClass;
