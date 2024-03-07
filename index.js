const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const videoFilePath = 'D:/montagne.mp4';

const videoFileName = '.mp4';

const uploadUrl = 'https://en3.uqload.to/upload/01?X-Progress-ID=XXXX';

const headers = {
    'Cookie': '',
    'Content-Type': '',
};

function extractVideoId(htmlResponse) {
    const regex = /<textarea name="fn">([^<]*)<\/textarea>/;
    const match = htmlResponse.match(regex);
    if (match) {
        return match[1];
    }
    return null;
}

async function uploadFile(filePath, fileName, uploadUrl, headers) {
    try {
        const formData = new FormData();
        formData.append('sess_id', '');
        formData.append('file', fs.createReadStream(filePath), { filename: fileName });

        const response = await axios.post(uploadUrl, formData, { headers });
        console.log('File uploaded successfully:', response.data);

        const videoId = extractVideoId(response.data);
        if (videoId) {
            console.log(`https://uqload.to/${videoId}.html`);
        } else {
            console.error('Failed to extract video ID from response.');
        }
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

uploadFile(videoFilePath, videoFileName, uploadUrl, headers);
