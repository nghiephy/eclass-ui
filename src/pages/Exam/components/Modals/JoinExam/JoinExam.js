import classNames from 'classnames/bind';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Button from '~/components/Button';
import Inputs from '~/components/Inputs';
import useAuth from '~/hooks/useAuth';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

import styles from './JoinExam.module.scss';

const cx = classNames.bind(styles);

function JoinExam({ onClose, dataExam, ...props }) {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const axiosPrivate = useAxiosPrivate();

    const onSubmit = async (data) => {
        try {
            const joinRes = await axiosPrivate.post('/exam/join', {
                userId: auth.id,
                postId: dataExam.postId,
                password: data.passwordJoin,
            });
            console.log(joinRes);
            console.log(dataExam);
            if (dataExam.status === 1) {
                alert('Bạn đã hoàn thành bài thi!');
            } else if (moment(dataExam.startedAt).diff(moment(), 'seconds') > 0) {
                alert('Chưa đến thời gian thi!');
            } else if (moment(dataExam.finishedAt).diff(moment(), 'seconds') < 0) {
                alert('Bài thi đã kết thúc!');
            } else {
                navigate(`/join-exam/${dataExam.postId}/${joinRes.data.data.id}`);
            }
        } catch (err) {
            console.log(err);
            alert('Mật khẩu sai! Vui lòng thử lại!');
        }
    };

    return (
        <Popup className={cx('wrapper')} {...props} onClose={onClose} style={{ borderRadius: '10px' }}>
            <div className={cx('modal')}>
                <span className={cx('exits')} onClick={onClose}>
                    &times;
                </span>
                <h2 className={cx('title')}>Xác nhận vào bài thi</h2>
                <p className={cx('sub-title')}>Vui lòng nhập mật khẩu để tiếp tục</p>

                <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
                    <Inputs
                        primary
                        name="passwordJoin"
                        type="text"
                        label="Mật khẩu (*)"
                        register={register}
                        validate={{
                            required: 'Chưa nhập mật khẩu',
                        }}
                        errors={errors}
                    />
                    <div className={cx('form-actions')}>
                        <Button outline className={cx('cancel')} onClick={onClose}>
                            Huỷ
                        </Button>
                        <Inputs submit className={cx('create')} type="submit" value="Xác Nhận" />
                    </div>
                </form>
            </div>
        </Popup>
    );
}

export default JoinExam;
