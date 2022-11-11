import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '~/components/Button';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useAuth from '~/hooks/useAuth';

import styles from './PostItem.module.scss';
import AttachItem from '~/components/Attachment/AttachItem';

const cx = classNames.bind(styles);

function AssignmentFilesBoard({ handleSubmit, data, isCompleted, checkUserId }) {
    const { userId } = useParams();
    const { auth } = useAuth();
    const [submitFiles, setSubmitFiles] = useState();
    const axiosPrivate = useAxiosPrivate();

    const getSubmitFiles = async () => {
        try {
            const response = await axiosPrivate.get(`/exercise/get-submit-files/${data.exerciseId}`, {
                params: {
                    userId: userId,
                },
            });
            setSubmitFiles(response.data.submitFiles);
        } catch (err) {
            console.log(err);
            alert('Lấy file submit thất bại!', err);
        }
    };
    console.log(submitFiles);

    useEffect(() => {
        if (data?.exerciseId) getSubmitFiles();
    }, [data]);

    return (
        <div className={cx('body-submit-assignment')}>
            <h2 className={cx('title')}>Files đã nộp</h2>
            {submitFiles &&
                submitFiles.map((file, index) => {
                    return (
                        <AttachItem
                            key={index}
                            type="file"
                            className={cx('body-attach-item')}
                            data={{ ...file, index: 1 }}
                        />
                    );
                })}
        </div>
    );
}

export default AssignmentFilesBoard;
