import classNames from 'classnames/bind';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './LoginRegisterLayout.module.scss';
import SliderItem from './components/SliderItem';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function SampleNextArrow(props) {
    const { className, customNav, style, onClick } = props;
    return <div className={`${className} ${customNav}`} style={{ ...style, display: 'none' }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
    const { className, customNav, style, onClick } = props;
    return <div className={`${className} ${customNav}`} style={{ ...style, display: 'none' }} onClick={onClick} />;
}

function LoginRegisterLayout({ children }) {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        speed: 1500,
        nextArrow: <SampleNextArrow customNav={cx('custom-next-nav')} />,
        prevArrow: <SamplePrevArrow customNav={cx('custom-prev-nav')} />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('body')}>
                    <div className={cx('slider-wrapper')}>
                        <div className={cx('header')}>
                            <div className={cx('header-imgbox')}>
                                <img src={images.logo} alt="header logo" className={cx('img')}></img>
                            </div>
                            <h2 className={cx('header-title')}>Welcome to EClass!</h2>
                        </div>
                        <div className={cx('slider')}>
                            <Slider {...settings}>
                                <SliderItem />
                                <SliderItem />
                                <SliderItem />
                            </Slider>
                        </div>
                    </div>
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default LoginRegisterLayout;
