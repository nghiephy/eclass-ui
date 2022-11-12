import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from '~/components/Button';
import { MyIcon } from '~/components/MyIcons';
import { IcThreeDotsVertical } from '~/components/MyIcons/regular';
import Menu from '~/components/Popover/Menu';

import styles from './Stream.module.scss';

const cx = classNames.bind(styles);

function EnrollSection({ data, menuEnroll }) {
    const [actionHidden, setActionHidden] = useState(false);

    const handleOnChange = async (menuItem) => {
        console.log(menuItem);
        setActionHidden((prev) => !prev);
    };

    return (
        <div className={cx('annouce-panel')}>
            <h2 className={cx('label')}>Mã mời</h2>
            <h2 className={cx('key')}>{data?.enrollKey}</h2>
            <div className={cx('more-btn-wrapper')}>
                {menuEnroll.length !== 0 && (
                    <Menu
                        arrow={false}
                        hideOnClick={true}
                        trigger={'click'}
                        placement="bottom-end"
                        delay={[50, 50]}
                        items={[...menuEnroll]}
                        onChange={handleOnChange}
                        className={cx('menu-more', { hidden: actionHidden })}
                    >
                        <Button
                            circle
                            className={cx('more-btn')}
                            onClick={() => {
                                setActionHidden(false);
                            }}
                        >
                            <MyIcon className={cx('more-icon')}>
                                <IcThreeDotsVertical />
                            </MyIcon>
                        </Button>
                    </Menu>
                )}
            </div>
        </div>
    );
}

export default EnrollSection;
