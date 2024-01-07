import React, { useState } from 'react';
import axios from 'axios';
import {Button, Divider, Flex, Select} from "antd";
import TextArea from "antd/es/input/TextArea";
import config from '../../api/config'


const LanguageTranslation = () => {
    // States to store source language, target language, and translation result
    const [sourceLang, setSourceLang] = useState('zh'); // Default to English
    const [targetLang, setTargetLang] = useState('en'); // Default to Spanish
    const [textToTranslate, setTextToTranslate] = useState('');
    const [translationResult, setTranslationResult] = useState('');
    // Function to handle translation request
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleTranslation = async () => {
        try {
            // Make AJAX request to the backend
            const response = await axios.get(`${config.apiUrl}/translationhandler/text_translation`, {
                params: {
                    text_to_translate: textToTranslate,
                    from_lang: sourceLang,
                    to_lang: targetLang,
                },
            });
            setTranslationResult(response.data.translation_result);
        } catch (error) {
            console.error('Error during translation:', error);
        }
    };


    function handleSourceLang(e) {
        setSourceLang(e.value)
    }

    function handleTargetLang(e) {
        setTargetLang(e.value)
    }
    function handle_SourceText(e)
    {
        if(e.target.value==='')
        {
            setTranslationResult('')
        }
        setTextToTranslate(e.target.value)
    }

    const boxStyle = {
        width: '100%',
        height: 40,
        borderRadius: 6,
    };
    return (
        <div>
            <Flex gap="middle" align="start" vertical>
                <Flex style={boxStyle} justify="center" align="center">
                    <p>原始语言</p>
                    <Select
                        labelInValue
                        defaultValue={{
                            value: 'zh',
                            label: '中文(zh)',
                        }}
                        style={{
                            width: 120,
                        }}
                        onChange={handleSourceLang}
                        options={[
                            {
                                value: 'zh',
                                label: '中文(zh)',
                            },
                            {
                                value: 'en',
                                label: '英文(en)',
                            },
                            {
                                value: 'ru',
                                label: '俄语(ru)',
                            },
                            {
                                value: 'jp',
                                label: '日语(jp)',
                            },
                            {
                                value: 'fra',
                                label: '法语(fra)',
                            },
                            {
                                value: 'de',
                                label: '德语(de)',
                            },
                        ]}
                    />
                    <Divider type="vertical" />
                    <Divider type="vertical" />
                    <Divider type="vertical" />
                    <Divider type="vertical" />
                    <Divider type="vertical" />
                    <Divider type="vertical" />
                    <p> 目标语言 </p>
                    <Select
                        labelInValue
                        defaultValue={{
                            value: 'en',
                            label: '英文(en)',
                        }}
                        style={{
                            width: 120,
                        }}
                        onChange={handleTargetLang}
                        options={[
                            {
                                value: 'zh',
                                label: '中文(zh)',
                            },
                            {
                                value: 'en',
                                label: '英文(en)',
                            },
                            {
                                value: 'ru',
                                label: '俄语(ru)',
                            },
                            {
                                value: 'jp',
                                label: '日语(jp)',
                            },
                            {
                                value: 'fra',
                                label: '法语(fra)',
                            },
                            {
                                value: 'de',
                                label: '德语(de)',
                            },
                        ]}
                    />
                </Flex>
            </Flex>
            <>
                <>
                    <br />
                    <br />
                    <TextArea rows={10} placeholder="待翻文本" maxLength={600} showCount={true} onChange={handle_SourceText} onPressEnter={handleTranslation}/>
                    <br />
                    <br />
                </>
                <Divider><Button onClick={handleTranslation}>开始翻译</Button></Divider>
                <>
                    <br />
                    <br />
                    <TextArea rows={10} placeholder="翻译结果" maxLength={600} showCount={true} value={translationResult} />
                </>
            </>
        </div>
    );
};

export default LanguageTranslation;
