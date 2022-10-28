import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';

import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import { MyIcon } from '~/components/MyIcons';
import { IcThreeDotsVertical } from '~/components/MyIcons/regular';
import Button from '~/components/Button';
import Inputs from '~/components/Inputs';

import styles from './PostItem.module.scss';
import Images from '~/components/Images';
import images from '~/assets/images';
import Menu from '~/components/Popover/Menu';
import AttachItem from '~/components/Attachment/AttachItem';

const cx = classNames.bind(styles);

const MENU_ITEMS_POST = [
    {
        title: 'Chỉnh sửa',
    },
    {
        title: 'Xoá',
    },
];

function PostItem({ data }) {
    const axiosPrivate = useAxiosPrivate();
    const [attachment, setAttachment] = useState();
    const handleOnChange = async (menuItem) => {
        console.log(menuItem);
    };

    const getAttachment = async () => {
        const dataRes = await axiosPrivate.get(`/post/get-attachment/${data.postId}`);
        setAttachment(dataRes.data.data);
    };

    useEffect(() => {
        getAttachment();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('more-btn-wrapper')}>
                <Menu
                    arrow={false}
                    hideOnClick={true}
                    trigger={'click'}
                    placement="bottom-end"
                    delay={[50, 50]}
                    items={MENU_ITEMS_POST}
                    onChange={handleOnChange}
                    className={cx('menu-more')}
                >
                    <Button circle className={cx('more-btn')}>
                        <MyIcon className={cx('more-icon')}>
                            <IcThreeDotsVertical />
                        </MyIcon>
                    </Button>
                </Menu>
            </div>

            <div className={cx('content')}>
                <div className={cx('author')}>
                    <div className={cx('img-box')}>
                        <Images
                            alt="author-avatar"
                            src={data.avatar ? `http://localhost:8080${data.avatar}` : images.noAvatar}
                        />
                    </div>
                    <div className={cx('author-infor')}>
                        <h2 className={cx('name')}>{data.fullName}</h2>
                        <p className={cx('time')}>{data.createdAt}</p>
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('body-content')} dangerouslySetInnerHTML={{ __html: data.content }}></div>
                    <div className={cx('body-attach', { row: true })}>
                        {attachment?.files &&
                            attachment.files.map((file, index) => {
                                return (
                                    <AttachItem
                                        key={index}
                                        type="file"
                                        className={cx('body-attach-item')}
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
                                        className={cx('body-attach-item')}
                                        data={{ ...link, index: index }}
                                    />
                                );
                            })}

                        {/* <AttachItem
                            className={cx('body-attach-item')}
                            data={{ url: 'url-https', title: '', index: 1 }}
                        />
                        <AttachItem
                            className={cx('body-attach-item')}
                            data={{ url: 'url-https', title: '', index: 1 }}
                        /> */}
                    </div>
                </div>
            </div>
            <div className={cx('comment')}></div>
        </div>
    );
}

export default PostItem;
