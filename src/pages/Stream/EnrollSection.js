import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import Button from '~/components/Button';
import { MyIcon } from '~/components/MyIcons';
import { IcThreeDotsVertical } from '~/components/MyIcons/regular';
import Menu from '~/components/Popover/Menu';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

import styles from './Stream.module.scss';

const cx = classNames.bind(styles);

function EnrollSection({ data, role, menuEnroll, setClassData }) {
    const axiosPrivate = useAxiosPrivate();
    const [actionHidden, setActionHidden] = useState(false);

    const toggleBlockKey = async () => {
        const classRes = await axiosPrivate.post(`/class/custom-key/${data.id}`, {
            value: data?.isBlockKey,
            code: 'blockKey',
        });
        console.log(classRes);
        setClassData(classRes.data.data);
        const newTitle = classRes.data.data.isBlockKey ? 'Kích hoạt mã' : 'Vô hiệu hoá';
        changeTitleMenu('blockKey', newTitle);
    };

    const toggleDisplayKey = async () => {
        const classRes = await axiosPrivate.post(`/class/custom-key/${data.id}`, {
            value: data?.isHiddenKey,
            code: 'hiddenKey',
        });
        console.log(classRes);
        setClassData(classRes.data.data);
        const newTitle = classRes.data.data.isHiddenKey ? 'Ẩn mã' : 'Bỏ ẩn';
        changeTitleMenu('hiddenKey', newTitle);
    };

    const handleChangeKey = async () => {
        const classRes = await axiosPrivate.post(`/class/custom-key/${data.id}`, {
            code: 'changeKey',
        });
        setClassData(classRes.data.data);
    };

    const handleOnChange = async (menuItem) => {
        if (menuItem.code === 'blockKey') {
            toggleBlockKey();
        }
        if (menuItem.code === 'hiddenKey') {
            toggleDisplayKey();
        }
        if (menuItem.code === 'changeKey') {
            handleChangeKey();
        }
        setActionHidden(true);
    };
    const changeTitleMenu = (code, newTitle) => {
        for (var i in menuEnroll) {
            if (menuEnroll[i].code === code) {
                menuEnroll[i].title = newTitle;
                break;
            }
        }
    };

    useEffect(() => {
        if (data?.isHiddenKey === true) {
            changeTitleMenu('hiddenKey', 'Bỏ ẩn');
        }
        if (data?.isBlockKey === true) {
            changeTitleMenu('blockKey', 'Kích hoạt mã');
        }
    }, [data]);

    return (
        <div className={cx('annouce-panel', { hidden: role === 'h' && data?.isHiddenKey === true })}>
            <h2 className={cx('label')}>Mã mời</h2>
            <h2 className={cx('key')}>{data?.enrollKey}</h2>
            {data?.isHiddenKey === true && <p>Đã ẩn với Học Sinh</p>}
            {data?.isBlockKey === true && role === 't' && <p>Đã vô hiệu hoá mã mời</p>}
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
