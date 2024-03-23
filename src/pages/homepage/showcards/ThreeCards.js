import React from 'react';
import { Flex } from 'antd';
import FirstCard from "./FirstCard";
import SecondCard from "./SecondCard";
import ThirdCard from "./ThirdCard";
import "./ThreeCards.css"
const boxStyle = {
    width: '80%',
    height: 280,
    borderRadius: 6,
    border: '1px solid #40a9ff',
};
const justifyOptions = [
    'flex-start',
    'center',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly',
];
const alignOptions = ['flex-start', 'center', 'flex-end'];
const ThreeCards = () => {
    return (
        <div className="cardContainer">
            <Flex gap="middle" align="start" vertical>
                <Flex style={boxStyle} justify={justifyOptions[1]} align={alignOptions[1]}>
                    {/* 学生端 */}
                    <FirstCard></FirstCard>
                    {/* 教师端 */}
                    <SecondCard></SecondCard>
                    {/* 管理员端 */}
                    <ThirdCard></ThirdCard>
                </Flex>
            </Flex>
        </div>
    );
};
export default ThreeCards;