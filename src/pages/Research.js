import React from 'react';
import { Steps, Row, Col, Popover, Typography,Image } from 'antd';
import {
    CodeSandboxSquareFilled, DatabaseFilled,
    FormatPainterFilled, RightSquareFilled, SignalFilled,
    ToolFilled
} from "@ant-design/icons";
import process from '../../src/pages/homepage/images/process.jpg'
const { Step } = Steps;
const { Title, Paragraph } = Typography;
const Research = () => {
    return (
        <div style={{ padding: '15px' }}>
            <Title level={3}>大模型研究过程</Title>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Steps direction="horizontal" current={5}>
                        <Step title="数据收集和准备" />
                        <Step title="模型架构选择" />
                        <Step title="模型训练" />
                        <Step title="超参数调优" />
                        <Step title="模型评估" />
                        <Step title="部署和应用" />
                    </Steps>
                </Col>
                <Col span={24} style={{ marginTop: '10px' }}>
                    <Popover content="收集大规模的文本数据，来源于互联网上的文本、书籍、论文、新闻文章等。随后对数据进行清洗和预处理，包括去除特殊字符、标记化、分词、删除停用词等。">
                        <div style={{ background: '#f0f2f5', padding: '10px', borderRadius: '5px' }}>
                            <Paragraph strong><DatabaseFilled />&nbsp;&nbsp;&nbsp;数据收集和准备</Paragraph>
                        </div>
                    </Popover>
                </Col>
                <Col span={24} style={{ marginTop: '10px' }}>
                    <Popover content="选择合适的模型架构，使用了循环神经网络（RNN）或变压器（Transformer）等。考虑模型的大小、参数量和计算资源需求等因素。">
                        <div style={{ background: '#f0f2f5', padding: '10px', borderRadius: '5px' }}>
                            <Paragraph strong><CodeSandboxSquareFilled />&nbsp;&nbsp;&nbsp;模型架构选择</Paragraph>
                        </div>
                    </Popover>
                </Col>
                <Col span={24} style={{ marginTop: '10px' }}>
                    <Popover content="将预处理后的数据输入到模型中进行训练。定义训练目标，例如语言建模（language modeling）、对话生成（dialogue generation）等。">
                        <div style={{ background: '#f0f2f5', padding: '10px', borderRadius: '5px' }}>
                            <Paragraph strong><FormatPainterFilled />&nbsp;&nbsp;&nbsp;&nbsp;模型训练</Paragraph>
                        </div>
                    </Popover>
                </Col>
                <Col span={24} style={{ marginTop: '10px' }}>
                    <Popover content="选择合适的学习率、批量大小、模型深度、隐藏层大小等超参数。通过验证集上的性能评估来调整超参数，以提高模型的性能和泛化能力。">
                        <div style={{ background: '#f0f2f5', padding: '10px', borderRadius: '5px' }}>
                            <Paragraph strong><ToolFilled />&nbsp;&nbsp;&nbsp;超参数调优</Paragraph>
                        </div>
                    </Popover>
                </Col>
                <Col span={24} style={{ marginTop: '10px' }}>
                    <Popover content="使用测试集对训练好的模型进行评估，以了解模型的性能和效果。常见的评估指标包括困惑度（perplexity）、BLEU分数等。">
                        <div style={{ background: '#f0f2f5', padding: '10px', borderRadius: '5px' }}>
                            <Paragraph strong><SignalFilled />&nbsp;&nbsp;&nbsp;模型评估</Paragraph>
                        </div>
                    </Popover>
                </Col>
                <Col span={24} style={{ marginTop: '10px' }}>
                    <Popover content="将训练好的模型部署到实际应用中。提供一个用户界面或API接口，以便用户可以与模型进行交互。">
                        <div style={{ background: '#f0f2f5', padding: '10px', borderRadius: '5px' }}>
                            <Paragraph strong><RightSquareFilled />&nbsp;&nbsp;&nbsp;部署和应用</Paragraph>
                        </div>
                    </Popover>
                </Col>
            </Row>
            <Row justify="center" style={{ marginTop: '10px' }}>
                <Col>
                    <Image width={900} height={400} src={process} />
                </Col>
            </Row>
        </div>
    );
};

export default Research;
