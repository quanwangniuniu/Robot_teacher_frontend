import React from "react";
import CountUp from 'react-countup';
import {Alert, Card, Col, Divider, Row, Statistic} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined, LikeOutlined} from "@ant-design/icons";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    ReferenceLine,
    Brush,
    Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import Marquee from "react-fast-marquee";
import Example from "./Example";

const line_data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const bar_data = [
    { name: '1', uv: 300, pv: 456 },
    { name: '2', uv: -145, pv: 230 },
    { name: '3', uv: -100, pv: 345 },
    { name: '4', uv: -8, pv: 450 },
    { name: '5', uv: 100, pv: 321 },
    { name: '6', uv: 9, pv: 235 },
    { name: '7', uv: 53, pv: 267 },
    { name: '8', uv: 252, pv: -378 },
    { name: '9', uv: 79, pv: -210 },
    { name: '10', uv: 294, pv: -23 },
    { name: '12', uv: 43, pv: 45 },
    { name: '13', uv: -74, pv: 90 },
    { name: '14', uv: -71, pv: 130 },
    { name: '15', uv: -117, pv: 11 },
    { name: '16', uv: -186, pv: 107 },
    { name: '17', uv: -16, pv: 926 },
    { name: '18', uv: -125, pv: 653 },
    { name: '19', uv: 222, pv: 366 },
    { name: '20', uv: 372, pv: 486 },
    { name: '21', uv: 182, pv: 512 },
    { name: '22', uv: 164, pv: 302 },
    { name: '23', uv: 316, pv: 425 },
    { name: '24', uv: 131, pv: 467 },
    { name: '25', uv: 291, pv: -190 },
    { name: '26', uv: -47, pv: 194 },
    { name: '27', uv: -415, pv: 371 },
    { name: '28', uv: -182, pv: 376 },
    { name: '29', uv: -93, pv: 295 },
    { name: '30', uv: -99, pv: 322 },
    { name: '31', uv: -52, pv: 246 },
    { name: '32', uv: 154, pv: 33 },
    { name: '33', uv: 205, pv: 354 },
    { name: '34', uv: 70, pv: 258 },
    { name: '35', uv: -25, pv: 359 },
    { name: '36', uv: -59, pv: 192 },
    { name: '37', uv: -63, pv: 464 },
    { name: '38', uv: -91, pv: -2 },
    { name: '39', uv: -66, pv: 154 },
    { name: '40', uv: -50, pv: 186 },
];

const radar_data = [
    {
        subject: '概念解析',
        A: 120,
        B: 110,
        fullMark: 150,
    },
    {
        subject: '系统设计',
        A: 98,
        B: 130,
        fullMark: 150,
    },
    {
        subject: '文本翻译',
        A: 86,
        B: 130,
        fullMark: 150,
    },
    {
        subject: '图表生成',
        A: 99,
        B: 100,
        fullMark: 150,
    },
    {
        subject: '代码助手',
        A: 85,
        B: 90,
        fullMark: 150,
    },
    {
        subject: '其他问题',
        A: 65,
        B: 85,
        fullMark: 150,
    },
];



const ApplicationStatics = () => {
        const formatter = (value) => <CountUp end={value} separator=","/>;
        return (
            <>
                <Row gutter={16}>
                    <Col span={12}>
                        <Statistic title="活动用户账号" value={112893} formatter={formatter}/>
                    </Col>
                    <Col span={12}>
                        <Statistic title="当前在线用户" value={52893} precision={2} formatter={formatter}/>
                    </Col>
                </Row>
                <Divider/>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card bordered={false}>
                            <Statistic
                                title="活跃度"
                                value={32.28}
                                precision={2}
                                valueStyle={{
                                    color: '#3f8600',
                                }}
                                prefix={<ArrowUpOutlined/>}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={false}>
                            <Statistic
                                title="发信息量"
                                value={9.3}
                                precision={2}
                                valueStyle={{
                                    color: '#cf1322',
                                }}
                                prefix={<ArrowDownOutlined/>}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                </Row>
                <Divider></Divider>
                <Row gutter={16}>
                    <Col span={12}>
                        <Statistic title="用户反馈量" value={1128} prefix={<LikeOutlined/>}/>
                    </Col>
                    <Col span={12}>
                        <Statistic title="互动用户比" value={93} suffix="/ 100"/>
                    </Col>
                </Row>
                <Divider></Divider>
                <Row>
                    <Col span={12}>
                        <h2>用户使用与机器人数据走势</h2>
                        <Alert
                            banner
                            message={
                                <Marquee pauseOnHover gradient={false}>
                                    pv表用户使用量,uv表机器人活动数量,数据获取可能有延迟,更新数据需要管理员重新刷新界面
                                </Marquee>
                            }
                            style={{width:800,marginBottom:14}}
                        />
                        <LineChart
                            width={800}
                            height={500}
                            data={line_data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                    </Col>
                    <Col span={12}>
                        <h2>近40天教师机器人与学生机器人使用量</h2>
                        <Alert
                            banner
                            message={
                                <Marquee pauseOnHover gradient={false}>
                                    pv表教师端机器人使用量,uv表学生端机器人活动数量,数据获取可能有延迟,更新数据需要管理员重新刷新界面
                                </Marquee>
                            }
                            style={{width:800,marginBottom:14}}
                            type={"info"}
                        />
                        <BarChart
                            width={800}
                            height={500}
                            data={bar_data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                            <ReferenceLine y={0} stroke="#000" />
                            <Brush dataKey="name" height={30} stroke="#8884d8" />
                            <Bar dataKey="pv" fill="#8884d8" />
                            <Bar dataKey="uv" fill="#82ca9d" />
                        </BarChart>
                    </Col>
                </Row>
                <Divider></Divider>
                <Row gutter={16}>
                    <Col span={12}>
                        <h2>系统功能使用情况</h2>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radar_data} width={800} height={500}>
                            <PolarGrid />
                                <PolarAngleAxis dataKey="subject" />
                                <PolarRadiusAxis />
                                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        </RadarChart>
                    </Col>
                    <Col span={10}>
                        <Example/>
                    </Col>
                </Row>
                <Divider></Divider>
            </>
        );
};

export default ApplicationStatics;