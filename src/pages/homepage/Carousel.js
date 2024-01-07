import React from 'react';
import { Carousel } from 'antd';
import {Image} from 'antd'
const contentStyle = {
    height: '90vh',
    color: '#00f1fd',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#ffffff',
};
const AntCarousel = () => (
    <Carousel autoplay>
        <div>
            <h3 style={contentStyle}>
                <Image
                    width={1600}
                    height={800}
                    src="https://p1.ifengimg.com/2018_33/B602CD5A3BF0111F3D2E93018F828B3BB47CBA48_w5760_h3840.jpg"
                />
            </h3>
        </div>
        <div>
            <h3 style={contentStyle}>
                <Image
                    width={1600}
                    height={800}
                   src="https://img.zcool.cn/community/0179935cd00422a801214168310786.jpg@2o.jpg"
                 />
            </h3>
        </div>
        <div>
            <h3 style={contentStyle}>
                <Image
                    width={1600}
                    height={800}
                    src="https://pic1.zhimg.com/8875ab83d888b61233bddba86d527ab6_r.jpg"
                />
            </h3>
        </div>
        <div>
            <h3 style={contentStyle}>
                <Image
                    width={1600}
                    height={800}
                    src="https://th.bing.com/th/id/R.8437d1762bdf630f68aa7f77beb421b7?rik=WINBlKuADA73wA&riu=http%3a%2f%2fwww.jialeidianqi.com%2fimages%2fup_images%2f20190916171946142.jpg&ehk=tPiVkEoUA5OfOp43UEH%2brOAi61b49BHIa8CrvrhV8Jw%3d&risl=&pid=ImgRaw&r=0"
                />
            </h3>
        </div>
    </Carousel>
);
export default AntCarousel;