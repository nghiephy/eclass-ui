import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { MyIcon } from '~/components/MyIcons';
import { IcUpload } from '~/components/MyIcons/regular';
import Button from '~/components/Button';
import Inputs from '~/components/Inputs';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

import styles from './EditAssignment.module.scss';
import Attachment from '~/components/Attachment';
import AttachItem from '~/components/Attachment/AttachItem';
import Select from '~/components/Select';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';

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

function EditAssignment({ onClose, data, setData, isOpen, attachment, setAttachment, setExercises = null, ...props }) {
    const { classId } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [oldAttachment, setOldAttachment] = useState(attachment);
    const [topic, setTopic] = useState(0);
    const [title, setTitle] = useState(data?.content);
    const [convertedText, setConvertedText] = useState(data?.guide);
    const [oldGuide, setOldGuide] = useState();
    const [linkList, setLinkList] = useState([]);
    const [fileList, setFileList] = useState();
    const [linksDeleted, setLinksDeleted] = useState([]);
    const [filesDeleted, setFilesDeleted] = useState([]);
    const [topics, setTopics] = useState([]);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [value, setValue] = useState();

    const getTopic = async () => {
        const topicRes = await axiosPrivate.get(`/topic/get-topics/${classId}`);

        setTopics((prev) => [
            {
                name: 'Tẩt cả',
                topicId: 0,
            },
            ...topicRes.data.topics,
        ]);
    };

    console.log(data);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        getExerciseData();
        getTopic();
        setValue(data?.deadline);
        if (attachment) {
            setOldAttachment(attachment);
        } else {
            getOldAttachment();
        }
    }, [isOpen]);

    const onSubmit = async (dataForm) => {
        const formData = new FormData();
        formData.append('content', convertedText || oldGuide);
        formData.append('links', linkList);
        if (fileList) {
            for (let i = 0; i < fileList.length; i++) {
                formData.append('files', fileList[i]);
            }
        }

        const deadline = value;

        formData.append('topicId', topic);
        formData.append('title', title);
        formData.append('linksDeleted', linksDeleted);
        formData.append('filesDeleted', filesDeleted);
        formData.append('classId', classId);
        formData.append('deadline', deadline);
        formData.append('postId', data.postId);
        console.log(convertedText);
        try {
            const response = await axiosPrivate.post('/exercise/update', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });
            console.log(response);
            if (setData) {
                setData((prev) => {
                    return response.data.updatedAssignment;
                });
            } else {
                window.location.reload();
            }
            setAttachment && setAttachment(response.data.updatedAttachment);
            onClose();
        } catch (err) {
            alert('Cập nhật bài tập thất bại!');
        }
    };

    const changeHandler = (event) => {
        setFileList(event.target.files);
    };

    const onClosePost = () => {
        setConvertedText(data?.guide);
        setTitle(data?.content);
        onClose();
    };

    const deleteOldLink = (linkId) => {
        setOldAttachment((prev) => {
            const linksNew = prev.links.filter((item) => item.linkId !== linkId);
            return { files: prev.files, links: linksNew };
        });
        setLinksDeleted((prev) => [linkId, ...prev]);
    };

    const deleteOldFile = (fileId) => {
        setOldAttachment((prev) => {
            const filesNew = prev.files.filter((item) => item.fileId !== fileId);
            return { links: prev.links, files: filesNew };
        });
        setFilesDeleted((prev) => [fileId, ...prev]);
    };

    const deleteItemLink = (index) => {
        setLinkList((prev) => {
            const array = [...prev];
            array.splice(index, 1);
            return array;
        });
    };

    const getExerciseData = async () => {
        const dataRes = await axiosPrivate.get(`/exercise/get-detail/${classId}/${data?.postId}`);
        setOldGuide(dataRes?.data?.exercise?.guide);
    };

    const getOldAttachment = async () => {
        const dataRes = await axiosPrivate.get(`/post/get-attachment/${data?.postId}`);
        setOldAttachment(dataRes.data.data);
    };

    useEffect(() => {
        getExerciseData();
        setConvertedText(data?.guide ? data.guide : oldGuide);
        setTitle(data?.content);
    }, [data]);

    return (
        <Popup className={cx('wrapper')} {...props} onClose={onClose} style={{ borderRadius: '10px' }} nested>
            <div className={cx('modal')}>
                <span className={cx('exits')} onClick={onClosePost}>
                    &times;
                </span>
                <h2 className={cx('title')}>Giao bài tập</h2>

                <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
                    <div className={cx('select-section')}>
                        <Select data={topics} currentData={data?.topicId} handleSelect={setTopic} label="Chủ đề" />
                        <div className={cx('deadline-picker')}>
                            <h3 className={cx('title')}>Ngày đến hạn: </h3>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    inputFormat="DD/MM/YYYY"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} className={cx('deadline-input')} />}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>

                    <Inputs
                        primary
                        name="title"
                        type="text"
                        value={title}
                        onChange={(e) => {
                            return setTitle(e.target.value);
                        }}
                        label="Tiêu đề (*)"
                        register={register}
                        validate={{
                            required: 'Chưa nhập tiêu đề',
                        }}
                        errors={errors}
                    />

                    <div className={cx('form-editor')}>
                        <ReactQuill
                            modules={{
                                toolbar: toolbarOptions,
                            }}
                            theme="snow"
                            placeholder="Nhập hướng dẫn cho bài tập"
                            value={convertedText || oldGuide}
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
                        {oldAttachment?.files &&
                            oldAttachment.files.map((file, index) => {
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
                        {oldAttachment?.links &&
                            oldAttachment.links.map((link, index) => {
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
                                    type="link"
                                    key={index}
                                    deleteItemLink={deleteItemLink}
                                    data={{ url: item, index: index }}
                                    className={cx('w-full')}
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

export default EditAssignment;
