import classNames from 'classnames/bind';
import { useEffect } from 'react';

import styles from './AttachItem.module.scss';

const cx = classNames.bind(styles);

function AttachItem({ data, className, ...passProps }) {
    const classes = cx('wrapper', {
        [className]: className,
    });

    useEffect(() => {
        fetch(data.url).then(function (res) {
            var body = res.text();
            var title = body.split('<title>')[1].split('</title>')[0];
            console.log(title);
        });
    }, []);

    return (
        <div className={classes}>
            <div className={cx('img-box')}>
                <img
                    src={`https://classroom.google.com/webthumbnail?url=${data.url}`}
                    alt="review link"
                    className={cx('img')}
                />
            </div>
            <div className={cx('body')}>
                <h2 className={cx('title')}>{data.title}</h2>
                <h5 className={cx('url')}>{data.url}</h5>
            </div>
        </div>
    );
}

export default AttachItem;
