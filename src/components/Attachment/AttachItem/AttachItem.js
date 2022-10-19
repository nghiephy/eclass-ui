import classNames from 'classnames/bind';
import { useEffect } from 'react';

import styles from './AttachItem.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function AttachItem({ data, className, setLinkList, ...passProps }) {
    const classes = cx('wrapper', {
        [className]: className,
    });

    return (
        <div className={classes}>
            <div className={cx('img-box')}>
                <img src={images.logoLink} alt="review link" className={cx('img')} />
            </div>
            <div className={cx('body')}>
                <span
                    className={cx('exits')}
                    onClick={() => {
                        setLinkList((prev) => prev.slice(data.index, data.index + 1));
                    }}
                >
                    &times;
                </span>
                <h2 className={cx('title')}>{data.title}</h2>
                <h5 className={cx('url')}>{data.url}</h5>
            </div>
        </div>
    );
}

export default AttachItem;
