# webkitSpeechRecognition

> 「声音可视化，兼容Chrome即可」：开发一个界面，能接收分析用户的声音，并根据声音的不同（包括音调、音量、频率、音色等），实时用图形方式展现声音特点

项目的做法并不符合需求，采集声音使用的是 HTML5 webkitSpeechRecognition 的API，而表现声音的不同则使用了event.results里的confidence属性，貌似是展现语音识别的准确率的情况而不是分析用户声音了，有待再开发……


