import classNames from 'classnames/bind';
import { useState, useRef } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from '~/components/Button';
import Inputs from '~/components/Inputs';
import styles from './AddLinkModal.module.scss';

const cx = classNames.bind(styles);

function AddLinkModal({ setLinkList, onClose, ...props }) {
    const [isLink, setIsLink] = useState(true);
    const linkRef = useRef();

    const onSubmitAddLink = (data) => {
        const linkValue = linkRef.current.value;
        const regex = new RegExp('(http[s]?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
        setIsLink(() => {
            if (regex.test(linkValue)) {
                setLinkList((prev) => {
                    return [...prev, linkValue];
                });
                onClose();
            }
            return regex.test(linkValue);
        });
    };

    return (
        <Popup nested className={cx('wrapper')} {...props} onClose={onClose} style={{ borderRadius: '10px' }}>
            <div className={cx('modal')}>
                <span className={cx('exits')} onClick={onClose}>
                    &times;
                </span>
                <h5 className={cx('title')}>Thêm liên kết</h5>

                <form id="addlink-form" className={cx('form')}>
                    <Inputs refParent={linkRef} primary name="classname" type="text" label="Nhập liên kết" />
                    {!isLink && <p className={cx('error-mesg')}>Định dạng liên kết không đúng</p>}
                    <div className={cx('form-actions')}>
                        <Button outline className={cx('cancel')} onClick={onClose}>
                            Huỷ
                        </Button>
                        <Button primary className={cx('add')} onClick={onSubmitAddLink}>
                            Thêm
                        </Button>
                    </div>
                </form>
            </div>
        </Popup>
    );
}

export default AddLinkModal;
