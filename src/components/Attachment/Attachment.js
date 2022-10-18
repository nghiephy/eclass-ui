import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { MyIcon } from '../MyIcons';
import { IcLink, IcUpload } from '../MyIcons/regular';

import styles from './Attachment.module.scss';
import AddLinkModal from './AddLinkModal';
import AttachItem from './AttachItem';

const cx = classNames.bind(styles);

function Attachment({ className, ...passProps }) {
    const [linkList, setLinkList] = useState([]);

    const classes = cx('wrapper', {
        [className]: className,
    });

    const [openAddLink, setOpenAddLink] = useState(false);
    const closeAddLink = () => setOpenAddLink(false);

    const toggleSidebar = () => {
        setOpenAddLink(!openAddLink);
    };

    console.log(linkList);

    return (
        <div className={classes}>
            <div className={cx('title')}>
                <h2>Đính kèm</h2>
            </div>
            <div className={cx('actions')}>
                <Tippy
                    delay={[250, 80]}
                    offset={[0, 0]}
                    moveTransition="transform 0.2s ease-out"
                    hideOnClick={false}
                    arrow={false}
                    content="Tải lên"
                    placement="bottom"
                >
                    <div className={cx('action-item')}>
                        <label htmlFor="file-input" className={cx('label')}>
                            <MyIcon>
                                <IcUpload />
                            </MyIcon>
                        </label>
                        <input style={{ display: 'none' }} type="file" multiple id="file-input" name="file" />
                    </div>
                </Tippy>

                <Tippy
                    delay={[250, 80]}
                    offset={[0, 0]}
                    moveTransition="transform 0.2s ease-out"
                    hideOnClick={false}
                    arrow={false}
                    content="Thêm liên kết"
                    placement="bottom"
                >
                    <div className={cx('action-item')}>
                        <label className={cx('label')} onClick={toggleSidebar}>
                            <MyIcon>
                                <IcLink />
                            </MyIcon>
                        </label>

                        <AddLinkModal
                            setLinkList={setLinkList}
                            open={openAddLink}
                            closeOnDocumentClick
                            onClose={closeAddLink}
                        />
                    </div>
                </Tippy>
            </div>
            <div className={cx('review')}>
                {linkList.map((item, index) => {
                    // let driver = new webdriver.Builder().forBrowser(webdriver.Browser.FIREFOX).build();

                    return <AttachItem key={index} data={{ url: item }} />;
                })}
            </div>
        </div>
    );
}

export default Attachment;
