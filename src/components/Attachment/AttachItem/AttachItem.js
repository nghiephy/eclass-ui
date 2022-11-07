import classNames from 'classnames/bind';

import styles from './AttachItem.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function AttachItem({ type, data, className, deleteItemLink, deleteOldAttachment, ...passProps }) {
    const classes = cx('wrapper', {
        [className]: className,
    });

    return (
        <div
            className={cx('review-container', {
                [className]: className,
            })}
        >
            <a
                className={classes}
                href={type === 'link' ? data.url : `http://localhost:8080${data.url}`}
                target="_blank"
                rel="noreferrer"
            >
                <div className={cx('img-box')}>
                    <img
                        src={type !== 'file' ? images.logoLink : images.fileIcon}
                        alt="review link"
                        className={cx('img')}
                    />
                </div>
                <div className={cx('body')}>
                    <h4 className={cx('title')}>{data?.name}</h4>
                    <h5 className={cx('url')}>{type !== 'file' && data.url}</h5>
                </div>
            </a>
            {deleteItemLink && (
                <span
                    className={cx('exits')}
                    onClick={() => {
                        deleteItemLink(data.index);
                    }}
                >
                    &times;
                </span>
            )}
            {deleteOldAttachment && (
                <span
                    className={cx('exits')}
                    onClick={() => {
                        deleteOldAttachment(data?.linkId ? data.linkId : data.fileId);
                    }}
                >
                    &times;
                </span>
            )}
        </div>
    );
}

export default AttachItem;
