import classNames from 'classnames/bind';

import styles from './SliderItem.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function SliderItem() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('img-box')}>
                <img src={images.test_slider_item_1} alt="slider 1" />
            </div>
            <h4 className={cx('slogan')}>
                Kết hợp linh hoạt giảng dạy phương pháp truyền thống ở trường và phương pháp mới (trực tuyến)
            </h4>
        </div>
    );
}

export default SliderItem;
