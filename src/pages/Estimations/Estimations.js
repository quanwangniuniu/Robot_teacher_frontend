import React from 'react';
import {  Table } from 'antd';
import './Estimations.css';
const Estimations = () => {
    const dataSource1 = [
        { key: '1', Hyperparameter: 'n_layers', Value: '24' },
        { key: '2', Hyperparameter: 'n_heads', Value: '16' },
        { key: '3', Hyperparameter: 'd_model', Value: '2048' },
        { key: '4', Hyperparameter: 'vocab size', Value: '151851' },
        { key: '5', Hyperparameter: 'sequence length', Value: '8192' },
    ];

    const dataSource2 = [
        { key: '1', Evaluation: 'Chinese Evaluation', Result: 'Acc.:50.2' },
        { key: '2', Evaluation: 'English Evaluation', Result: 'Acc.:62.2' },
        { key: '3', Evaluation: 'Coding Evaluation', Result: 'Pass@1: 19.8' },
        { key: '4', Evaluation: 'Mathematics Evaluation', Result: 'Pass@1: 58.5' },
    ];

    const dataSource3 = [
        { key: '1', 'Quantization Level': 'FP32', 'Peak Usage for Encoding 2048 Tokens': '8.34GB', 'Peak Usage for Generating 8192 Tokens': '14.32GB' },
        { key: '2', 'Quantization Level': 'BF16', 'Peak Usage for Encoding 2048 Tokens': '4.23GB', 'Peak Usage for Generating 8192 Tokens': '7.12GB' },
        { key: '3', 'Quantization Level': 'Int8', 'Peak Usage for Encoding 2048 Tokens': '3.56GB', 'Peak Usage for Generating 8192 Tokens': '5.36GB' },
        { key: '4', 'Quantization Level': 'Int4', 'Peak Usage for Encoding 2048 Tokens': '2.35GB', 'Peak Usage for Generating 8192 Tokens': '4.83GB' },
    ];

    const dataSource4 = [
        { key: '1', Model: 'FP32', CEval: '39.4',GSM8K:'33.0',HumanEval:'26.5'},
        { key: '2', Model: 'BF16', CEval: '39.2',GSM8K:'33.6',HumanEval:'23.5'},
        { key: '3', Model: 'Int8', CEval: '39.1',GSM8K:'33.2',HumanEval:'27.5'},
        { key: '4', Model: 'Int4', CEval: '40.2',GSM8K:'31.2',HumanEval:'25.5'},
    ];

    const columns = [
        { title: 'Hyperparameter', dataIndex: 'Hyperparameter', key: 'Hyperparameter' },
        { title: 'Value', dataIndex: 'Value', key: 'Value' },
    ];

    const columns2 = [
        { title: 'Evaluation', dataIndex: 'Evaluation', key: 'Evaluation' },
        { title: 'Result', dataIndex: 'Result', key: 'Result' },
    ];

    const columns3 = [
        { title: 'Quantization Level', dataIndex: 'Quantization Level', key: 'Quantization Level' },
        { title: 'Peak Usage for Encoding 2048 Tokens', dataIndex: 'Peak Usage for Encoding 2048 Tokens', key: 'Peak Usage for Encoding 2048 Tokens' },
        { title: 'Peak Usage for Generating 8192 Tokens', dataIndex: 'Peak Usage for Generating 8192 Tokens', key: 'Peak Usage for Generating 8192 Tokens' },
    ];

    const columns4 = [
        { title: 'Model', dataIndex: 'Model', key: 'Model' },
        { title: 'CEval', dataIndex: 'CEval', key: 'CEval' },
        { title: 'GSM8K', dataIndex: 'GSM8K', key: 'GSM8K' },
        { title: 'HumanEval', dataIndex: 'HumanEval', key: 'HumanEval' },
    ];

    return (
        <div className="animated-table-container">
            <div className="animated-table">
                <h2>模型细节（Model）</h2>
                <p>与Meicy-1.8B预训练模型相同，Meicy-1.8B-Chat模型规模基本情况如下所示</p>
                <Table dataSource={dataSource1} columns={columns} pagination={false} />
            </div>
            <div className="animated-table">
                <h2>评测细节(Estimation Detail)</h2>
                <p>在C-Eval验证集上，我们评价了Meicy-1.8B-Chat模型的准确率。MMLU评测集上，Meicy-1.8B-Chat模型的准确率如下，效果同样在同类对齐模型中同样表现良好。 </p>
                <p>在HumanEval的zero-shot Pass@1效果同其他模型相比一般。在评测数学能力的GSM8K上的准确率结果较优</p>
                <Table dataSource={dataSource2} columns={columns2} pagination={false} />
            </div>
            <div className="animated-table">
                <h2>显存使用 (GPU Memory Usage)</h2>
                <p>我们测算了FP32、BF16精度和Int8、Int4量化模型生成2048个及8192个token（单个token作为输入）的峰值显存占用情况。结果如下所示：</p>
                <Table dataSource={dataSource3} columns={columns3} pagination={false} />
            </div>
            <div className="animated-table">
                <h2>效果评测</h2>
                <p>使用原始模型的FP32和BF16精度，以及量化过的Int8和Int4模型在基准评测上做了测试，结果如下所示：</p>
                <Table dataSource={dataSource4} columns={columns4} pagination={false} />
            </div>
        </div>
    );
};

export default Estimations;
