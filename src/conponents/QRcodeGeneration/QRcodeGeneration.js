import React, { useState } from 'react';
import {Alert, Button, Input, QRCode, Space} from 'antd';

const QRcodeGeneration = () => {
    const [qrCodeValue, setQRCodeValue] = useState('https://baidu.com');
    const extractFileName = (url) => {
        const match = url.match(/\/\/([^/]+)\//);
        return match ? match[1] : 'QRCode';
    };
    const downloadQRCode = () => {
        const canvas = document.getElementById('myqrcode')?.querySelector('canvas');
        if (canvas) {
            const url = canvas.toDataURL();
            const fileName = `${extractFileName(qrCodeValue)}.png`;
            const a = document.createElement('a');
            a.download = fileName;
            a.href = url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    return (
        <div id="myqrcode">
            <QRCode
                value={qrCodeValue}
                bgColor="#fff"
                size={250}
                style={{
                    marginBottom: 16,
                }}
            />
            <Input
                placeholder="请输入要生成二维码的链接"
                value={qrCodeValue}
                onChange={(e) => setQRCodeValue(e.target.value)}
                style={{ marginBottom: 16, marginTop: 16}}
            />
            <Button type="primary" onClick={downloadQRCode} style={{ marginLeft: 2}} size="large">
                下载二维码
            </Button>
            <Space direction="vertical" style={{ width: '100%', marginTop:130 }}>
                <Alert
                    message="二维码生成工具提示"
                    description="通过输入的链接您可以生成任何二维码，也可以通过点击下方'下载二维码'的按钮直接将生成的二维码下载到您的本地,但请注意，链接的输入格式必须为:https://xxx.xxx//xxx.com"
                    type="info"
                    showIcon
                    closable
                />
            </Space>
        </div>
    );
};

export default QRcodeGeneration;
