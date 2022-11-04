import classNames from 'classnames/bind';
import Button from '~/components/Button';

import styles from './SubmitForm.module.scss';

const cx = classNames.bind(styles);

function SubmitForm({}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2 className={cx('title')}>Phần nộp bài</h2>
                <p className={cx('status')}>Chưa nộp</p>
            </div>
            <div className={cx('body')}>
                <label htmlFor="submit-file" className={cx('chosefile-btn')}>
                    <Button outline>Chọn file</Button>
                </label>
                <input id="submit-file" type="file" name="submitFiles" hidden></input>
                <Button primary>Nộp bài</Button>
            </div>
        </div>
    );
}

export default SubmitForm;
