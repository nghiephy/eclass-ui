import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';

import Button from '~/components/Button';
import Inputs from '~/components/Inputs';

import styles from './Post.module.scss';
import Attachment from '~/components/Attachment';

const cx = classNames.bind(styles);

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'], // remove formatting button
];

function Post({ onClose, ...props }) {
    const [convertedText, setConvertedText] = useState('');
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        console.log(convertedText);
    };

    const onClosePost = () => {
        onClose();
        setConvertedText('');
    };

    return (
        <Popup className={cx('wrapper')} {...props} onClose={onClose} style={{ borderRadius: '10px' }} nested>
            <div className={cx('modal')}>
                <span className={cx('exits')} onClick={onClosePost}>
                    &times;
                </span>
                <h2 className={cx('title')}>Đăng thông báo</h2>

                <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
                    {/* <Select data={dataClass} label="Chọn lớp" /> */}

                    <div className={cx('form-editor')}>
                        <ReactQuill
                            modules={{
                                toolbar: toolbarOptions,
                            }}
                            theme="snow"
                            placeholder="Nhập thông báo cho lớp học của bạn"
                            value={convertedText}
                            onChange={setConvertedText}
                        />
                    </div>

                    {/* <div className={cx('form-attachment')}>
                        <input {...register('file')} type="file" multiple name="file" />
                    </div> */}
                    <Attachment />

                    <div className={cx('form-actions')}>
                        <Button outline className={cx('cancel')} onClick={onClosePost}>
                            Huỷ
                        </Button>
                        <Inputs submit className={cx('create')} type="submit" value="Đăng" />
                    </div>
                </form>
            </div>
        </Popup>
    );
}

export default Post;
