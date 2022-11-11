import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import AttachItem from '~/components/Attachment/AttachItem';
import Button from '~/components/Button';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

import styles from './SubmitForm.module.scss';

const cx = classNames.bind(styles);

function SubmitForm({ data, setPostData, isCompleted, setIsCompleted }) {
    const axiosPrivate = useAxiosPrivate();
    const [fileList, setFileList] = useState();
    const [submitFiles, setSubmitFiles] = useState([]);

    const changeHandler = (event) => {
        setFileList(event.target.files);
    };

    const handleSubmitForm = async () => {
        const formData = new FormData();

        formData.append('postId', data.postId);
        formData.append('exerciseId', data.exerciseId);

        if (fileList) {
            for (let i = 0; i < fileList.length; i++) {
                formData.append('files', fileList[i]);
            }
        } else {
            alert('Vui lòng chọn file đính kèm!');
            return;
        }

        try {
            const response = await axiosPrivate.post('/exercise/submit', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });
            setIsCompleted(true);
            setSubmitFiles(response.data.submitFiles);
        } catch (err) {
            alert('Đăng thông báo thất bại!');
        }
    };

    const getSubmitFiles = async () => {
        try {
            const response = await axiosPrivate.get(`/exercise/get-submit-files/${data.exerciseId}`);
            setSubmitFiles(response.data.submitFiles);
        } catch (err) {
            alert('Lấy file submit thất bại!');
        }
    };

    useEffect(() => {
        if (isCompleted) {
            getSubmitFiles();
        }
    }, [data]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2 className={cx('title')}>Phần nộp bài</h2>
                <p className={cx('status')}>{isCompleted ? 'Đã nộp' : 'Chưa nộp'}</p>
            </div>
            {!isCompleted && (
                <div className={cx('body')}>
                    <label htmlFor="submit-file" className={cx('chosefile-btn')}>
                        <Button outline>Chọn file</Button>
                    </label>
                    <input
                        id="submit-file"
                        type="file"
                        name="submitFiles"
                        hidden
                        multiple
                        onChange={changeHandler}
                    ></input>

                    <Button primary onClick={handleSubmitForm}>
                        Nộp bài
                    </Button>
                </div>
            )}

            <div className={cx('submit-files')}>
                {submitFiles.map((item, index) => {
                    return <AttachItem key={index} type="file" className={'w-full'} data={item} />;
                })}
            </div>
        </div>
    );
}

export default SubmitForm;
