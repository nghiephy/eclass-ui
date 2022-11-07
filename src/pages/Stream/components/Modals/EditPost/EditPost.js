import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';

import { MyIcon } from '~/components/MyIcons';
import { IcUpload } from '~/components/MyIcons/regular';
import Button from '~/components/Button';
import Inputs from '~/components/Inputs';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

import styles from './EditPost.module.scss';
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

function EditPost({ onClose, postData, setDataPost, setUpdateAttachment, classId, ...props }) {
    const axiosPrivate = useAxiosPrivate();
    const [convertedText, setConvertedText] = useState('');
    const [attachment, setAttachment] = useState();
    const [linkList, setLinkList] = useState([]);
    const [fileList, setFileList] = useState();
    const [linksDeleted, setLinksDeleted] = useState([]);
    const [filesDeleted, setFilesDeleted] = useState([]);
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

        formData.append('classId', parseInt(classId));
        formData.append('type', 'TB');
        formData.append('linksDeleted', linksDeleted);
        formData.append('filesDeleted', filesDeleted);
        formData.append('postId', postData.postId);

        try {
            const response = await axiosPrivate.post('/post/update', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });
            console.log(response);
            setDataPost((prev) => ({ ...prev, ...response.data.updatedPost }));
            console.log(response.data.updatedAttachment);
            setUpdateAttachment(response.data.updatedAttachment);
            onClose();
        } catch (err) {
            console.log(err);
            alert('Chỉnh sửa thông báo thất bại!');
        }
    };

    const changeHandler = (event) => {
        setFileList(event.target.files);
    };

    const onClosePost = () => {
        onClose();
        setConvertedText(postData.content);
    };

    const deleteItemLink = (index) => {
        setLinkList((prev) => {
            const array = [...prev];
            array.splice(index, 1);
            return array;
        });
    };

    const deleteOldLink = (linkId) => {
        setAttachment((prev) => {
            const linksNew = prev.links.filter((item) => item.linkId !== linkId);
            return { files: prev.files, links: linksNew };
        });
        setLinksDeleted((prev) => [linkId, ...prev]);
    };

    const deleteOldFile = (fileId) => {
        setAttachment((prev) => {
            const filesNew = prev.files.filter((item) => item.fileId !== fileId);
            return { links: prev.links, files: filesNew };
        });
        setFilesDeleted((prev) => [fileId, ...prev]);
    };

    const getAttachment = async () => {
        const dataRes = await axiosPrivate.get(`/post/get-attachment/${postData.postId}`);
        setAttachment(dataRes.data.data);
    };

    useEffect(() => {
        getAttachment();
        setConvertedText(postData.content);
    }, []);

    return (
        <Popup className={cx('wrapper')} {...props} onClose={onClose} style={{ borderRadius: '10px' }} nested>
            <div className={cx('modal')}>
                <span className={cx('exits')} onClick={onClosePost}>
                    &times;
                </span>
                <h2 className={cx('title')}>Chỉnh sửa thông báo</h2>

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
                        {attachment?.files &&
                            attachment.files.map((file, index) => {
                                return (
                                    <AttachItem
                                        key={index}
                                        type="file"
                                        deleteOldAttachment={deleteOldFile}
                                        className={cx('body-attach-item', { 'w-full': true })}
                                        data={{ ...file, index: 1 }}
                                    />
                                );
                            })}
                        {attachment?.links &&
                            attachment.links.map((link, index) => {
                                return (
                                    <AttachItem
                                        key={index}
                                        type="link"
                                        deleteOldAttachment={deleteOldLink}
                                        className={cx('body-attach-item', { 'w-full': true })}
                                        data={{ ...link, index: index }}
                                    />
                                );
                            })}
                        {linkList.map((item, index) => {
                            return (
                                <AttachItem
                                    key={index}
                                    deleteItemLink={deleteItemLink}
                                    className={cx('w-full')}
                                    data={{ url: item, index: index }}
                                />
                            );
                        })}
                    </div>

                    <div className={cx('form-actions')}>
                        <Button outline className={cx('cancel')} onClick={onClosePost}>
                            Huỷ
                        </Button>
                        <Inputs submit className={cx('create')} type="submit" value="Cập nhật" />
                    </div>
                </form>
            </div>
        </Popup>
    );
}

export default EditPost;
