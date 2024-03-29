import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';

import { MyIcon } from '~/components/MyIcons';
import { IcUpload } from '~/components/MyIcons/regular';
import Button from '~/components/Button';
import Inputs from '~/components/Inputs';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

import styles from './Post.module.scss';
import Attachment from '~/components/Attachment';
import AttachItem from '~/components/Attachment/AttachItem';

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
    const axiosPrivate = useAxiosPrivate();
    const [convertedText, setConvertedText] = useState('');
    const [linkList, setLinkList] = useState([]);
    const [fileList, setFileList] = useState();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('content', convertedText);
        formData.append('links', linkList);
        if (fileList) {
            for (let i = 0; i < fileList.length; i++) {
                formData.append('files', fileList[i]);
            }
        }

        const currURL = window.location.href;
        const classId = currURL[currURL.length - 1];

        formData.append('classId', parseInt(classId));
        formData.append('type', 'TB');

        try {
            const response = await axiosPrivate.post('/post/create', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });
            window.location.reload();
        } catch (err) {
            alert('Đăng thông báo thất bại!');
        }
    };

    const changeHandler = (event) => {
        setFileList(event.target.files);
    };

    const onClosePost = () => {
        onClose();
        setConvertedText('');
    };

    const deleteItemLink = (index) => {
        setLinkList((prev) => {
            const array = [...prev];
            array.splice(index, 1);
            return array;
        });
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

                    <div className={cx('attach-section')}>
                        <div className={cx('attach-file')}>
                            <Tippy
                                delay={[250, 80]}
                                offset={[0, 0]}
                                moveTransition="transform 0.2s ease-out"
                                hideOnClick={false}
                                arrow={false}
                                content="Tải lên"
                                placement="bottom"
                            >
                                <div className={cx('action-item')}>
                                    <label htmlFor="file-input" className={cx('label')}>
                                        <MyIcon>
                                            <IcUpload />
                                        </MyIcon>
                                    </label>
                                    <input
                                        {...register('file')}
                                        style={{ display: 'none' }}
                                        type="file"
                                        multiple
                                        id="file-input"
                                        name="file"
                                        onChange={changeHandler}
                                    />
                                </div>
                            </Tippy>
                        </div>
                        <Attachment setLinkList={setLinkList} />
                    </div>

                    <div className={cx('review')}>
                        {linkList.map((item, index) => {
                            return (
                                <AttachItem
                                    key={index}
                                    deleteItemLink={deleteItemLink}
                                    data={{ url: item, index: index }}
                                />
                            );
                        })}
                    </div>

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
