import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import Button from '~/components/Button';
import Inputs from '~/components/Inputs';

import styles from './PostItem.module.scss';
import Images from '~/components/Images';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function CommentForm({ handleSubmit, data }) {
    const [commentText, setCommentText] = useState('');
    const isDisabledCmtBtn = commentText?.length === 0;

    const submitComment = () => {
        handleSubmit(commentText);
        setCommentText('');
    };
    return (
        <div className={cx('body-comment')}>
            <div className={cx('img-box')}>
                <Images alt="user-avatar" src={data.avatar ? `http://localhost:8080${data.avatar}` : images.noAvatar} />
            </div>
            <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className={cx('input-comment')}
                placeholder="Nhập bình luận ở đây"
            />
            <Button primary disabled={isDisabledCmtBtn} onClick={submitComment}>
                Gửi
            </Button>
        </div>
    );
}

export default CommentForm;
