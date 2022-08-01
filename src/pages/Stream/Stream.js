import classNames from 'classnames/bind';

import styles from './Stream.module.scss';

const cx = classNames.bind(styles);

function Stream() {
    return (
        <div className={cx('wrapper')}>
            <h1>This is stream page!</h1>
        </div>
    );
}

export default Stream;
