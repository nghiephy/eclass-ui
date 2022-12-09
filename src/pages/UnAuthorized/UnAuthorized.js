import classNames from 'classnames/bind';
import images from '~/assets/images';
import Images from '~/components/Images';

import styles from './UnAuthorized.module.scss';

const cx = classNames.bind(styles);

function UnAuthorized() {
    return (
        <div className={cx('wrapper')}>
            <Images src={images.unAuthorized} alt="unauthorized"></Images>
        </div>
    );
}

export default UnAuthorized;
