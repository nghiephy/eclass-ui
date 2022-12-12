import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Button from '~/components/Button';
import Inputs from '~/components/Inputs';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import { useParams } from 'react-router-dom';

import styles from './UpdateTopic.module.scss';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function UpdateTopic({ onClose, topics, currentTopic, setTopics, ...props }) {
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm();
    const axiosPrivate = useAxiosPrivate();
    const { classId } = useParams();

    const onSubmit = async (data) => {
        const topicRes = await axiosPrivate.post('/topic/create', {
            classId: classId,
            topic: data.topic,
        });
        setTopics((prev) => {
            return [...prev, topicRes.data.response];
        });
        onClose();
    };

    useEffect(() => {
        setValue('topic', topics[currentTopic]?.name);
    });

    return (
        <Popup className={cx('wrapper')} {...props} onClose={onClose} style={{ borderRadius: '10px' }}>
            <div className={cx('modal')}>
                <span className={cx('exits')} onClick={onClose}>
                    &times;
                </span>
                <h2 className={cx('title')}>Cập nhật chủ đề</h2>
                <p className={cx('sub-title')}>Vui lòng nhập tên chủ đề mới</p>

                <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
                    <Inputs
                        primary
                        name="topic"
                        type="text"
                        label="Chủ đề (*)"
                        register={register}
                        validate={{
                            required: 'Chưa nhập chủ đề',
                        }}
                        errors={errors}
                    />
                    <div className={cx('form-actions')}>
                        <Button outline className={cx('cancel')} onClick={onClose}>
                            Huỷ
                        </Button>
                        <Inputs submit className={cx('create')} type="submit" value="Cập nhật" />
                    </div>
                </form>
            </div>
        </Popup>
    );
}

export default UpdateTopic;
