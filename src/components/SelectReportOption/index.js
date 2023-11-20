import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './SelectReportOption.module.scss';
import Button from '../Button';
import * as contentReportServices from '../../services/contentReportServices';
import * as report_pinServices from '../../services/report_pinServices';
import ActionAlerts from '../Alert';

const cx = classNames.bind(styles);

function SelectReportOption({ handleTurnOnSelectReport, pin, user }) {
    const [listReport, setListReport] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await contentReportServices.getAllContent_Report();
            setListReport(result);
        };
        fetchApi();
    }, []);

    const [statusSave, setStatusSave] = useState(false);

    const handleSaveResult = (result) => {
        console.log(result);
        setStatusSave(result);
        if (result) {
            setTimeout(() => {
                setStatusSave(false);
                handleTurnOnSelectReport(false);
            }, 2500);
        }
        // window.location.reload();
    };

    const [red, setRedButton] = React.useState(false);
    const [reported, setReportOption] = useState([]);

    const handleReport = () => {
        const fetchApi = async () => {
            const report = {
                approve: false,
                reject: true,
                content: reported,
                pin: pin,
                userRatify: null,
                userReport: user,
            };
            // console.log(report);
            const result = await report_pinServices.save(report);
            // console.log(result);
            handleSaveResult(result);
        };
        fetchApi();
    };

    return (
        <div className={cx('popup-background')}>
            <div className={cx('gray-background')} onClick={() => handleTurnOnSelectReport(false)}></div>
            <div className={cx('popup-container')}>
                <div className={cx('popup-top')}>
                    <h2>Báo cáo Ghim</h2>
                </div>
                <div className={cx('list-report')}>
                    {listReport.map((item, index) => {
                        return (
                            <div className={cx('item-report')}>
                                <div className={cx('wrapper')}>
                                    <input
                                        className={cx('radioBTN')}
                                        type="radio"
                                        name="reportOption"
                                        onChange={(e) => (setRedButton(true), setReportOption(item))}
                                    />
                                    <label className={cx('content')}>{item.content}</label>
                                </div>
                                <p className={cx('description')}>{item.description}</p>
                            </div>
                        );
                    })}
                </div>
                <div className={cx('optionBtn')}>
                    <Button className={cx('saveBtn')} primary onClick={() => handleTurnOnSelectReport(false)}>
                        Hủy
                    </Button>
                    {red ? (
                        <Button className={cx('saveBtn')} red onClick={() => handleReport()}>
                            Báo cáo
                        </Button>
                    ) : (
                        <Button className={cx('saveBtn')} primary>
                            Báo cáo
                        </Button>
                    )}
                </div>
                {statusSave && <ActionAlerts content={`Đã báo cáo`} action="UNDO" />}
            </div>
        </div>
    );
}

export default SelectReportOption;
